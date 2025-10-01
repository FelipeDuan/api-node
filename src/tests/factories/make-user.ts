import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";
import { Roles } from "../../routes/hooks/check-user-role.ts";
import { sign } from "jsonwebtoken";

export async function makeUser(role?: Roles) {
  const passwordBeforeHash = randomUUID();

  const result = await db
    .insert(users)
    .values({
      name: faker.lorem.words(4),
      email: faker.internet.email(),
      password: await hash(passwordBeforeHash),
      role,
    })
    .returning();

  return { user: result[0], passwordBeforeHash };
}

export async function makeAuthenticatedUser(role: Roles) {
  const { user } = await makeUser(role);

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be set.");
  }

  const token = sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET);

  return { user, token };
}
