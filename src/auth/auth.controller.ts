import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import {
	ALREADY_REGISTERED_EMAIL_ERROR,
	ALREADY_REGISTERED_USERNAME_ERROR,
} from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserNoteDto } from './dto/user-note.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserDocument } from './user.model';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldEmailUser = await this.authService.findUserByEmail(dto.email);
		if (oldEmailUser) {
			throw new BadRequestException(ALREADY_REGISTERED_EMAIL_ERROR);
		}
		const oldUsernameUser = await this.authService.findUserByUsername(
			dto.username,
		);
		if (oldUsernameUser) {
			throw new BadRequestException(ALREADY_REGISTERED_USERNAME_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() { email, password }: LoginDto) {
		console.log(email);
		const userData = await this.authService.validateUser(email, password);
		return this.authService.login(userData);
	}

	@UseGuards(JwtAuthGuard)
	@Post('notes/add')
	@HttpCode(201)
	async addToNotes(
		@Body() dto: UserNoteDto,
		@User() user: UserDocument,
	) {
		return this.authService.addNotesById(user._id, dto);
	}
}
