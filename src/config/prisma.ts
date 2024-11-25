import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.room.createMany({
    data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 }
    ],
    skipDuplicates: true
});

await prisma.account.createMany({
    data: [
        {
            id: 1,
            email: "admin@admin.com",
            password:
                "$2b$10$iUQnAAEFP2b8ldgQeX0Pj.HoLh9Z0VV/ppLZWcPEww.NMRq.DeHS.",
            name: "Cabral",
            role: "admin"
        }
    ],
    skipDuplicates: true
});

export { prisma, Prisma };
