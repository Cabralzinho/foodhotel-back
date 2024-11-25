import { prisma } from "../config/prisma";

type CreateArgs = {
    name: string;
    roomId: number;
}

export class GuestRepository {
    public static async getGuests() {
        return prisma.guest.findMany();
    }

    public static async createGuest({ name, roomId }: CreateArgs) {
        return prisma.guest.create({
            data: {
                name: name,
                room: {
                    connect: {
                        id: Number(roomId)
                    }
                }
            }
        });
    }

    public static async deleteGuest(id: number) {
        return prisma.guest.delete({
            where: {
                id: Number(id)
            }
        });
    }
}
