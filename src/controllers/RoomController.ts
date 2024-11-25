import { prisma } from "@/config/prisma";
import { NotFoundError } from "@/errors/NotFoundError";
import { FastifyReply, FastifyRequest } from "fastify";

export class RoomController {
    static async getRooms() {
        return await prisma.room.findMany({
            orderBy: {
                id: "asc"
            },
            include: {
                guest: true
            }
        });
    }

    static async checkout(request: FastifyRequest, reply: FastifyReply) {
        const params = request.params as any;

        const roomId = Number(params.roomId);

        const currentGuest = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        }).guest();

        if (!currentGuest) {
            return new NotFoundError("Guest not found" );
        }

        const room = await prisma.room.update({
            where: {
                id: roomId
            },
            data: {
                guestId: null,
            }
        });

        const guest = await prisma.guest.update({
            where: {
                id: currentGuest.id
            },
            data: {
                hasCheckout: true
            }
        })

        return room;
    }
}
