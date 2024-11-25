import { FastifyReply, FastifyRequest } from "fastify";
import { AccountService } from "../services/AccountService";

export class AuthController {
    private static readonly accountService = new AccountService();

    public static async register(request: FastifyRequest, reply: FastifyReply) {
        const account = await AuthController.accountService.register(
            request.body as {
                name: string;
                email: string;
                password: string;
                role: string;
            }
        );

        return account;
    }

    public static async login(request: FastifyRequest, reply: FastifyReply) {
        const account = await AuthController.accountService.login(
            request.body as { email: string; password: string }
        );

        return account;
    }
}
