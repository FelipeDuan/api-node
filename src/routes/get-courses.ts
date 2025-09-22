import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import z from "zod";
import { ilike, asc } from "drizzle-orm";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["cursos"],
        summary: "Listar todos os cursos",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(["id", "title"]).optional().default("id"),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
              })
            ),
          }),
        },
      },
    },
    async (req, reply) => {
      const { search, orderBy } = req.query;

      const result = await db
        .select({ id: courses.id, title: courses.title })
        .from(courses)
        .where(search ? ilike(courses.title, `%${search}%`) : undefined)
        .orderBy(asc(courses[orderBy]));

      return reply.send({ courses: result });
    }
  );
};
