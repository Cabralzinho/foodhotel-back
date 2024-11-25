import { ProductRepository } from "@/repositories/ProductRepository";

type CreateArgs = {
    name: string;
    price: number;
    description: string;
    amount: number;
    image: string;
};


export class ProductService {
    private static readonly productRepository = new ProductRepository();

    static async saveImage({
        name,
        price,
        description,
        amount,
        image,
    }: CreateArgs) {
        const newProduct = await ProductService.productRepository.createProduct({
            name: name,
            description: description,
            price: price,
            amount: amount,
            imagePath: image,
        });

        return newProduct;
    }
}
