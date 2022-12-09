import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

export class fromData {
	@Prop()
	username: string;

	@Prop()
	image: string;
}

@Schema()
export class Review {
	@Prop()
	from: fromData;

	@Prop()
	animeId: number;

	@Prop()
	description: string;

	@Prop({ default: [] })
	likedBy: Types.ObjectId[];

	@Prop({ default: [] })
	dislikedBy: Types.ObjectId[];

	@Prop({ default: new Date() })
	createdAt: Date = new Date();
}

export const ReviewModel = SchemaFactory.createForClass(Review);
