import { createServer } from "node:http";
import next from "next";

const args = process.argv.slice(2);
const portIndex = args.findIndex((arg) => arg === "-p" || arg === "--port");
const port = Number(
  portIndex >= 0 && args[portIndex + 1] ? args[portIndex + 1] : process.env.PORT ?? 3000
);
const hostname = "localhost";

const app = next({ dev: true, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((request, response) => {
  handle(request, response);
});

server.listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});

const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
