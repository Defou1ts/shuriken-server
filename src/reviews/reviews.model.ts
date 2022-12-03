import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
	@Prop()
	userId: Types.ObjectId;

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
