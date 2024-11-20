import { prisma } from "@/config/prisma";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { pipeline } from "node:stream/promises";
import { MultipartFile } from "@fastify/multipart";

type CreateArgs = {
    name: string;
    price: number;
    description: string;
    amount: number;
    file: MultipartFile;
};

export class ProductService {
    static async saveFile({
        name,
        price,
        description,
        amount,
        file
    }: CreateArgs) {
        const { src, fileName } = await this.saveImage(file);

        const newProduct = await prisma.products.create({
            data: {
                name: name,
                amount: amount,
                price: price,
                description: description,
                image: {
                    create: {
                        src: src,
                        filename: fileName
                    }
                }
            }
        });

        return newProduct;
    }

    private static async saveImage(file: MultipartFile) {
        const uploadDir = path.join(process.cwd(), "uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const fileNameRandom = `${uuidv4()}${path.extname(file.filename)}`;
        const filePathDestination = path.join(uploadDir, fileNameRandom);

        const writeStream = fs.createWriteStream(filePathDestination);

        try {
            await pipeline(file.file, writeStream);
        } catch (error) {
            throw new Error(`Erro ao salvar o arquivo: ${error}`);
        }

        return {
            src: `/uploads/${fileNameRandom}`,
            fileName: fileNameRandom
        };
    }
}
