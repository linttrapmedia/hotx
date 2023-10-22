import { WatchEventType, watch } from "fs";

type ServerOptions = {
  hostname?: string;
  port?: number;
};

async function buildBrowser(
  _: WatchEventType,
  filename?: string | Error | undefined
) {
  console.log(`Building: ${filename ?? "All Assets"}`);

  await Bun.build({
    entrypoints: [
      "./impl/browser/hotx/runtime/runtime.ts",
      "./impl/browser/hotx/web-components/HotDrawer.ts",
      "./impl/browser/hotx/web-components/HotDrawerToggle.ts",
    ],
    outdir: "./app/static",
    target: "browser",
    minify: !Boolean(process.env.WATCH_MODE),
    naming: {
      entry: "[name].js",
      asset: "[name].js",
    },
    sourcemap: "external",
  });
}

export async function createServer({
  hostname = "127.0.0.1",
  port = 3030,
}: ServerOptions) {
  // Build frontend assets on start
  buildBrowser("change");

  // Watch for changes in development mode
  if (process.env.WATCH_MODE) {
    const runtimePath = "./impl/browser";
    watch(runtimePath, { recursive: true }, buildBrowser);
  }

  // Start the bun page router
  const pageRouter = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: process.cwd() + "/app/pages",
  });

  const apiRouter = new Bun.FileSystemRouter({
    style: "nextjs",
    assetPrefix: "/api",
    dir: process.cwd() + "/app",
  });

  const staticRouter = new Bun.FileSystemRouter({
    style: "nextjs",
    assetPrefix: "/static",
    dir: process.cwd() + "/app",
  });

  async function handleApi(req: Request, filePath: string) {
    try {
      const file = await import(filePath);
      const result = await file.default(req);
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.log(err);
      // something went wrong, we don't want to crash the server so serve a 500
      return new Response("500", { status: 500 });
    }
  }

  async function handlePage(req: Request, filePath: string) {
    try {
      const file = await import(filePath);
      const result = await file.default();
      return new Response(result, {
        headers: { "Content-Type": "text/html" },
      });
    } catch (err: any) {
      // something went wrong, we don't want to crash the server so serve a 500
      return new Response("500", { status: 500 });
    }
  }

  async function handleStatic(filePath: string) {
    try {
      const blob = Bun.file("./app/" + filePath);
      const blobText = await blob.text();
      return new Response(blobText, {
        headers: {
          "Content-Type": blob.type,
        },
      });
    } catch (err: any) {
      // something went wrong, just return a 400
      return new Response("400", { status: 400 });
    }
  }

  // Start the bun server
  const server = Bun.serve({
    hostname,
    port,
    async fetch(req) {
      // check if it's a page
      const pageMatch = pageRouter.match(req);
      if (pageMatch) return handlePage(req, pageMatch.filePath);

      // check if it's an api request
      const apiMatch = apiRouter.match(req);
      if (apiMatch) return handleApi(req, apiMatch.filePath);

      const staticMatch = staticRouter.match(req);
      if (staticMatch) return handleStatic(staticMatch.filePath);

      // check if it's a public file
      const url = new URL(req.url);
      const pathname = url.pathname;
      const publicMatch = pathname.startsWith("/static/");
      if (!publicMatch) return new Response("403", { status: 403 });

      // check if the file type is allowed
      const ext = pathname.split(".").pop() ?? "";
      const allowed = ["js", "css"].includes(ext);
      if (!allowed) return new Response("403", { status: 403 });

      // must be a static public file
      return handleStatic(pathname);
    },
  });

  // Log the server info
  console.log(`Listening on http://${server.hostname}:${server.port}...`);
}
