import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { UserNoteDto } from './dto/user-note.dto';
import { User, UserDocument } from './user.model';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			username: dto.username,
			email: dto.email,
			passwordHash: await hash(dto.password, salt),
		});
		newUser.save();
		const { passwordHash, ...userData } = newUser.toObject();
		return userData;
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findUserByUsername(username: string) {
		return this.userModel.findOne({ username }).exec();
	}

	async findByEmailAndUsername(username: string, email: string) {
		return this.userModel.findOne({ $or: [{ username }, { email }] });
	}

	async validateUser(email: string, password: string) {
		const user = await this.findUserByEmail(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		const { passwordHash, ...userData } = user.toObject();
		return userData;
	}

	async login(userData: any) {
		const payload = { userData };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async updateImageById(id: string, image: string) {
		return this.userModel.findByIdAndUpdate(id, { image }, { new: true });
	}

	async addNotesById(id: string, dto: UserNoteDto) {
		await this.userModel.findByIdAndUpdate(
			id,
			{
				$pull: { notes: { animeId: dto.animeId } },
			},
			{ new: true },
		);
		return this.userModel.findByIdAndUpdate(
			id,
			{
				$push: { notes: dto },
			},
			{ new: true },
		);
	}
}