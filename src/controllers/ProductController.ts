import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepository } from "../repositories/ProductRepository";
import z from "zod";
import { UploadService } from "../services/UploadService";

const productRepository = new ProductRepository();

export class ProductController {
    public static async createProduct(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const body = request.body as any

        const imagePath = new UploadService().upload(body.image);

        const product = await productRepository.createProduct({
            ...body,
            imagePath: await imagePath
        })

        return product
    }

    public static async getProducts() {
        const products = await productRepository.getProducts();

        return products.map((product) => ({
            ...product,
            imagePath: `http://localhost:8080${product.imagePath}`
        }));
    }

    public static async deleteProduct(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id } = request.params as { id: number };

        const product = await productRepository.deleteProduct(id);

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
