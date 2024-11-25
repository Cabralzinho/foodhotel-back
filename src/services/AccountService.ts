import { z } from "zod";
import bcrypt from "bcrypt";
import { AccountRepository } from "../repositories/AccountRepository";
import jwt from "jsonwebtoken";

export class AccountService {
    private static readonly accountRepository = new AccountRepository();
    public async login(data: { email: string; password: string }) {
        const schema = z.object({
            email: z.string(),
            password: z.string().min(6)
        });

        const body = schema.parse(data);

        const account = await AccountService.accountRepository.findByEmail(
            body.email
        );

        if (!account) {
            throw new Error("Conta não encontrada");
        }

        const isPasswordvalid = await bcrypt.compare(
            body.password,
            account.password
        );

        if (!isPasswordvalid) {
            throw new Error("Senha incorreta");
        }

        const token = jwt.sign(
            {
                data: account.id
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d"
            }
        );

        return { token };
    }

    public async register(data: {
        name: string;
        email: string;
        password: string;
        role: string;
    }) {
        const schema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string().min(6),
            role: z.string().default("waiter")
        });

        const body = schema.parse(data);

        const hashPassword = await bcrypt.hash(body.password, 10);

        body.password = hashPassword;

        const account = await AccountService.accountRepository.create(body);

        return account;
    }
}
