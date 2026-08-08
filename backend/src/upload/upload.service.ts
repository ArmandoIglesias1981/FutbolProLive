import { Injectable, BadRequestException } from "@nestjs/common";
import { Readable } from "stream";

import cloudinary from "../common/cloudinary.provider";

@Injectable()
export class UploadService {
  async subirImagen(
    file: Express.Multer.File,
  ): Promise<{ url: string }> {

    if (!file) {
      throw new BadRequestException(
        "No se recibió ninguna imagen.",
      );
    }

    return new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "futbolpro/equipos",
          resource_type: "image",
        },
        (error, result) => {

          if (error) {
            return reject(error);
          }

          resolve({
            url: result!.secure_url,
          });

        },
      );

      Readable.from(file.buffer).pipe(stream);

    });
  }
}