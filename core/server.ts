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
    dir: process.cwd() + "/app/pages",
  });

  // Start the bun parts router
  const partsRouter = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: process.cwd() + "/app",
    assetPrefix: "/parts/",
  });

  // Start the ports router
  const portsRouter = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: process.cwd() + "/app",
    assetPrefix: "/ports/",
  });

  // Helpers
  async function handleHtml(req: Request, filePath: string) {
    try {
      const file = await import(filePath);
      const html = await file.default(req);
      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    } catch (err: any) {
      // something went wrong, we don't want to crash the server so serve a 500
      return new Response("500", { status: 500 });
    }
  }

  async function handleStatic(filePath: string) {
    try {
      const blob = Bun.file("./src" + filePath);
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
      if (pageMatch) return handleHtml(req, pageMatch.filePath);

      // check if it's a component
      const partsMatch = partsRouter.match(req);
      if (partsMatch) return handleHtml(req, partsMatch.filePath);

      // check if it's a port
      const portsMatch = portsRouter.match(req);
      if (portsMatch) return handleHtml(req, portsMatch.filePath);

      // check if it's a public file
      const url = new URL(req.url);
      const pathname = url.pathname;
      const publicMatch = pathname.startsWith("/public/");
      if (!publicMatch) return new Response("403", { status: 403 });

      // check if the file type is allowed
      const ext = pathname.split(".").pop() ?? "";
      const allowed = [".js", ".css"].includes(ext);
      if (!allowed) return new Response("403", { status: 403 });

      // must be a static public file
      return handleStatic(pathname);
    },
  });

  // Log the server info
  console.log(`Listening on http://${server.hostname}:${server.port}...`);
}
