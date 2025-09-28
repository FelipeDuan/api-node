import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeCouse } from "../tests/factories/make-course.ts";

test("get a course by id", async () => {
  await server.ready();

  const course = await makeCouse();

  const response = await request(server.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("return 404 for non existing courses", async () => {
  await server.ready();

  const course = await makeCouse();

  const response = await request(server.server).get(
    `/courses/8b1227bd-b771-4db5-994c-925027ba71e3`
  );

  expect(response.status).toEqual(404);
});
