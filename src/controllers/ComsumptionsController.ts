import { prisma } from "@/config/prisma";
import { NotFoundError } from "@/errors/NotFoundError";
import { FastifyReply, FastifyRequest } from "fastify";

export class ConsumptionsController {
    static async updateComsumption(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const params = request.params as any;

        const guestId = Number(params.guestId);

        const body = request.body as any;

        const product = await prisma.products.findUnique({
            where: {
                id: body.productId
            }
        });

        if (!product) {
            throw new NotFoundError("Produto nao encontrado");
        }

        if (body.amount <= 0) {
            return await ConsumptionsController.deleteComsumption(request, reply);
        }

        const orderProduct = await prisma.consumptions.upsert({
            where: {
                guestId_productId: {
                    guestId: guestId,
                    productId: body.productId
                }
            },
            create: {
                amount: body.amount,
                productId: product.id,
                price: product.price,
                description: product.description,
                name: product.name,
                imagePath: product.imagePath,
                guestId: guestId
            },
            update: {
                amount: body.amount,
                productId: product.id,
                price: product.price,
                description: product.description,
                name: product.name,
                imagePath: product.imagePath,
                guestId: guestId
            }
        });

        return orderProduct;
    }

    static async deleteComsumption(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const params = request.params as any;
        const body = request.body as any;

        const guestId = Number(params.guestId);

        await prisma.consumptions.delete({
            where: {
                guestId_productId: {
                    guestId: guestId,
                    productId: body.productId
                }
            }
        });
    }

    static async getOrder(request: FastifyRequest, reply: FastifyReply) {
        const params = request.params as any;

        const guestId = Number(params.guestId);

        return await prisma.consumptions.findMany({
            where: {
                guestId: guestId
            }
        });
    }
}
