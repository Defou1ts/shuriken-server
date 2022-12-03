import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
	@IsString()
	userId: Types.ObjectId;

	@IsNumber()
	animeId: number;

	@IsString()
	description: string;
}
