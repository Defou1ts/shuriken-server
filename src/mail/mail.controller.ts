import { MailerService } from '@nestjs-modules/mailer';
import { Controller, UseGuards, Get, Post, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserDocument } from 'src/auth/user.model';
import { User } from 'src/decorators/user.decorator';
const generatePassword = require('password-generator');

@Controller('mail')
export class MailController {
	constructor(private mailService: MailerService) {}

	@UseGuards(JwtAuthGuard)
	@Get('sendVerify')
	async sendVerifyToken(@User() user: UserDocument) {
		const verifyKey = generatePassword(5).toUpperCase();
		const res = await this.mailService.sendMail({
			to: user.email,
			from: 'serviceshuriken@gmail.com',
			subject: 'Shuriken - verify Email adress',
			text: `Hello, ${user.username}, take you verification code - ${verifyKey}`,
		});
		return { verifyKey };
	}
}
