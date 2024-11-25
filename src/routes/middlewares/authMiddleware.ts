import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { authorization } = request.headers;

    const token = authorization?.split(" ")[1];

    if (!token) {
        throw new UnauthorizedError("Token ausente");
    }

    try {
        const tokenDecoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        return tokenDecoded;
    } catch (error) {
        throw new UnauthorizedError("Token inválido ou expirado");
    }
};
