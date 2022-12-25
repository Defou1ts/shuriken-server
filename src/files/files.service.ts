import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import * as sharp from 'sharp';
import { ensureDir, writeFile } from 'fs-extra';

import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from 'src/auth/user.model';

@Injectable()
export class FilesService {
	constructor(private readonly authService: AuthService) {}

	async saveUserImage(file: Express.Multer.File, user: UserDocument) {
		const uploadFolder = `${path}/src/assets/users`;
		await ensureDir(uploadFolder);
		await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
		return this.authService.updateImageById(user._id, file.originalname);
	}

	async convertToWebP(file: Express.Multer.File): Promise<Express.Multer.File> {
		file.buffer = await sharp(file.buffer).webp().toBuffer();
		return file;
	}
}
