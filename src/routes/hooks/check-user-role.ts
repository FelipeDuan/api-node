import { FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";
import { getAuthenticationUserFromRequest } from "../../utils/get-authentication-user-from-request.ts";

export async function checkUserRole(req: FastifyRequest, reply: FastifyReply) {
  const user = getAuthenticationUserFromRequest(req);

  if (user.role !== "manager") {
    return reply.status(401).send();
  }
}
