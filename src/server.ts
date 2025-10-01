import { server } from "./app.ts";

const port = Number(process.env.PORT ?? 3333);
server.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
