import { prisma } from "../config/prisma";
import { Iproduct } from "../types/Product";

type CreateArgs = {
    name: string;
    price: number;
    description: string;
    amount: number;
    src: string;
    fileName: string;
};

export class ProductRepository {
    public async createProduct({
        name,
        price,
        description,
        amount,
        src,
        fileName
    }: CreateArgs) {
        return await prisma.products.create({
            data: {
                name: name,
                price: price,
                amount: amount,
                description: description,
                image: {
                    create: {
                        src: src,
                        filename: fileName
                    }
                }
            }
        });
    }

    public async getProducts() {
        return await prisma.products.findMany();
    }

    public async deleteProduct(id: number) {
        return await prisma.products.delete({
            where: {
                id: Number(id)
            }
        });
    }

    public async updateProduct(
        id: number,
        { name, price, description, amount }: Iproduct
    ) {
        return await prisma.products.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                price: price,
                description: description,
                amount: amount
            }
        });
    }

    public async getImage(id: number) {
        return await prisma.image.findUnique({
            where: {
                productId: Number(id)
            }
        });
    }
}
