import { FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";
import { getAuthenticationUserFromRequest } from "../../utils/get-authentication-user-from-request.ts";

export type Roles = "student" | "manager";

export function checkUserRole(role: Roles) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = getAuthenticationUserFromRequest(req);

    if (user.role !== role) {
      return reply.status(401).send();
    }
  };
}
