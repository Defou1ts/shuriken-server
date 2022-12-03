import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
	@IsString()
	username: string;

	@IsEmail()
	@IsString()
	email: string;

	@IsString()
	password: string;
}
