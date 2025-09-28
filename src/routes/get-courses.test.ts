import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeCouse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";
import { courses } from "../database/schema.ts";

test("get a course by id", async () => {
  await server.ready();

  const titleID = randomUUID();

  const course = await makeCouse(titleID);

  const response = await request(server.server).get(
    `/courses?search=${titleID}`
  );

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleID,
        enrollments: 0,
      },
    ],
  });
});
