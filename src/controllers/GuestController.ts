import { FastifyReply, FastifyRequest } from "fastify";
import { GuestRepository } from "../repositories/GuestRepository";
import { prisma } from "@/config/prisma";

export class GuestController {
    public static async getGuests() {
        return await GuestRepository.getGuests();
    }

    public static async createGuest(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const body = request.body as any;

        const guest = await prisma.guest.create({
            data: {
                name: body.name,
                companions: body.companions,
                roomId: Number(body.roomId)
            }
        });

        await prisma.room.update({
            where: {
                id: Number(body.roomId)
            },
            data: {
                guestId: guest.id
            }
        });

        return guest;
    }

    public static async deleteGuest(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id } = request.params as { id: number };

        const guest = await GuestRepository.deleteGuest(id);

        return guest;
    }

    public static async getGuest(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: number };

        const guest = await prisma.guest.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Room: true
            }
        });

        return guest;
    }
}
