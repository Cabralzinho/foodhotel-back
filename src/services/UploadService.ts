import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

export class UploadService {
    public async upload(file: Buffer) {
        const fileType = await fileTypeFromBuffer(file);
        const fileName = `${uuidv4()}.${fileType?.ext}`;

        const destPath = path.join(fileURLToPath(import.meta.url), "../../../uploads/" + fileName);

        fs.writeFileSync(destPath, file);

        return "/uploads/" + fileName;
    }
}
