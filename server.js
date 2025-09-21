const fastify = require("fastify");
const crypto = require("crypto");

const server = fastify();

const courses = [
  { id: "1", title: "Curso de NodeJS" },
  { id: "2", title: "Curso de React" },
  { id: "3", title: "Curso de React Native" },
];

server.get("/courses", () => {
  return { courses };
});

server.get("/courses/:id", (req, reply) => {
  const courseId = req.params.id;

  const course = courses.find((course) => course.id === courseId);

  if (course) {
    return { course };
  }

  return reply.status(404).send();
});

server.post("/courses", (req, reply) => {
  const courseId = crypto.randomUUID();
  const courseTitle = req.body.title;

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
