import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { UploadService } from "./upload.service";

@Controller("upload")
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),

      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },

      fileFilter(req, file, callback) {
        if (!file.mimetype.startsWith("image/")) {
          return callback(
            new Error("Solo se permiten imágenes."),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  async subirArchivo(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.uploadService.subirImagen(file);
  }
}