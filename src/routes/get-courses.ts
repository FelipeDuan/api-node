import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import z, { number } from "zod";
import { ilike, asc, and, SQL } from "drizzle-orm";

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
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
              })
            ),
            total: number(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { search, orderBy, page } = req.query;

      const conditions: SQL[] = [];

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`));
      }

      const [result, total] = await Promise.all([
        db
          .select({ id: courses.id, title: courses.title })
          .from(courses)
          .where(and(...conditions))
          .limit(2)
          .offset((page - 1) * 2)
          .orderBy(asc(courses[orderBy])),
        db.$count(courses, and(...conditions)),
      ]);

      return reply.send({ courses: result, total });
    }
  );
};
