import Context from "./context";

type ServerOptions = {
  hostname?: string;
  port?: number;
};

export function createServer({
  hostname = "127.0.0.1",
  port = 3030,
}: ServerOptions) {
  // Start the bun page router
  const pageRouter = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: process.cwd() + "/src/app/pages",
  });

  // Helpers
  async function handleDynamic(req: Request, filePath: string) {
    try {
      const file = await import(filePath);
      const ctx = new Context(req);
      const html = await file.default({ ctx });
      return new Response(html, {
        headers: ctx.headers,
      });
    } catch (err: any) {
      // something went wrong, we don't want to crash the server so serve a 500
      return new Response("500", { status: 500 });
    }
  }

  async function handleStatic(filePath: string) {
    try {
      const blob = Bun.file("./src/app" + filePath);
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
      if (pageMatch) return handleDynamic(req, pageMatch.filePath);

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
