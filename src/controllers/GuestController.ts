import { FastifyReply, FastifyRequest } from "fastify";
import { GuestRepository } from "../repositories/GuestRepository";
import z from "zod";

export class GuestController {
    public static async getGuests() {
        return await GuestRepository.getGuests();
    }

    public static async createGuest(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const schema = z.object({
            name: z.string(),
            escort: z.string(),
            roomId: z.number()
        });

        const body = schema.parse(request.body);

        const guest = await GuestRepository.createGuest(body);

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
}
