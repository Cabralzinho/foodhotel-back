import { prisma } from "../config/prisma";

type CreateArgs = {
    name: string;
    price: number;
    description: string;
    amount: number;
    imagePath: string;
};

export class ProductRepository {
    public async createProduct({
        name,
        price,
        description,
        amount,
        imagePath
    }: CreateArgs) {
        return await prisma.products.create({
            data: {
                name: name,
                price: Number(price),
                amount: Number(amount),
                description: description,
                imagePath: imagePath
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
        {
            name,
            price,
            description,
            amount
        }: { name: string; price: number; description: string; amount: number }
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
}
