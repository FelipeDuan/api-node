// const fastify = require("fastify");
// const crypto = require("crypto");

import fastify from "fastify";
import crypto from "node:crypto";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

const courses = [
  { id: "1", title: "Curso de NodeJS" },
  { id: "2", title: "Curso de React" },
  { id: "3", title: "Curso de React Native" },
];

server.get("/courses", () => {
  return { courses };
});

server.get("/courses/:id", (req, reply) => {
  type Params = {
    id: string;
  };

  const params = req.params as Params;
  const courseId = params.id;

  const course = courses.find((course) => course.id === courseId);

  if (course) {
    return { course };
  }

  return reply.status(404).send();
});

server.post("/courses", (req, reply) => {
  type Body = {
    title: string;
  };

  const courseId = crypto.randomUUID();

  const body = req.body as Body;
  const courseTitle = body.title;

  if (!courseTitle) {
    return reply.status(400).send({ message: "Título obrigatório" });
  }

  courses.push({
    id: courseId,
    title: "Novo curso",
  });

  return reply.status(201).send({ courseId });
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
