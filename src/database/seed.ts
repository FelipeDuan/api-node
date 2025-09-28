import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { hash } from "argon2";

async function seed() {
  const passwordHash = await hash("123456");

  const usersInsert = await db
    .insert(users)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
    ])
    .returning();

  const coursersInsert = await db
    .insert(courses)
    .values([{ title: faker.lorem.words(4) }, { title: faker.lorem.words(4) }])
    .returning();

  await db.insert(enrollments).values([
    {
      courseId: coursersInsert[0].id,
      userId: usersInsert[0].id,
    },
    {
      courseId: coursersInsert[0].id,
      userId: usersInsert[1].id,
    },
    {
      courseId: coursersInsert[1].id,
      userId: usersInsert[2].id,
    },
  ]);

  console.log("Banco populado.");
  return;
}

seed();
