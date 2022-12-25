import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserDocument } from 'src/auth/user.model';
import { User } from 'src/decorators/user.decorator';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@UseGuards(JwtAuthGuard)
	@Post('uploadUserImage')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File, @User() user: UserDocument) {
		const convertedFile = await this.filesService.convertToWebP(file);
		convertedFile.originalname = `${user.username}.webp`;
		return this.filesService.saveUserImage(file, user);
	}
}
