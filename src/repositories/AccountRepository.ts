import { prisma } from "../config/prisma";

type CreateArgs = {
    email: string;
    password: string;
    name: string;
    role: string;
}

export class AccountRepository {
    public async create(args: CreateArgs) {
        return prisma.account.create({
            data: args
        });
    }

    public async findByEmail(email: string) {
        return prisma.account.findUnique({
            where: {
                email: email
            }
        });
    }
}
