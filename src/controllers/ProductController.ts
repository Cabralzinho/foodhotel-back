import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepository } from "../repositories/ProductRepository";
import z from "zod";
import { MultipartFile } from "@fastify/multipart";
import { ProductService } from "@/services/ProductService";

const productRepository = new ProductRepository();

interface FileRequest extends FastifyRequest {
    file: () => Promise<MultipartFile | undefined>;
}

export class ProductController {
    public static async createProduct(
        request: FileRequest,
        reply: FastifyReply
    ) {
        const schema = z.object({
            name: z.string(),
            price: z.number(),
            amount: z.number(),
            description: z.string(),
        });

        const body = schema.parse(request.body);

        const file = await request.file();

        console.log(body);

        if (!file) {
            return reply.status(400).send({ error: "Arquivo não enviado." });
        }

        const product = await ProductService.saveFile({ 
            ...body,
            file: file,
        });

        return product;
    }

    public static async getProducts() {
        const products = await productRepository.getProducts();

        return products;
    }

    public static async deleteProduct(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id } = request.params as { id: number };

        const product = await productRepository.deleteProduct(id);

        console.log(id);

        return product;
    }

    public static async updateProduct(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id } = request.params as { id: number };

        const schema = z.object({
            name: z.string(),
            price: z.number(),
            description: z.string(),
            amount: z.number()
        });

        const body = schema.parse(request.body);

        const product = await productRepository.updateProduct(id, body);

        return product;
    }
}
