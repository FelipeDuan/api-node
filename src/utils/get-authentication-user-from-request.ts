import { FastifyRequest } from "fastify";

export function getAuthenticationUserFromRequest(req: FastifyRequest) {
  const user = req.user;

  if (!user) {
    throw new Error("Invalid authentication");
  }

  return user;
}
