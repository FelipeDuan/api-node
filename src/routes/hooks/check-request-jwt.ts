import { FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";

type JWTPayload = {
  sub: string;
  role: "student" | "manager";
};

export async function checkRequestJWT(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const token = req.headers.authorization;

  if (!token) {
    return reply.status(401).send();
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be set.");
  }
  try {
    const payload = verify(token, process.env.JWT_SECRET) as JWTPayload;

    req.user = payload;
  } catch {
    return reply.status(401).send();
  }
}
