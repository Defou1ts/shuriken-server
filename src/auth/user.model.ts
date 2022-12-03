import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum NotesTypes {
	planning = 'planning',
	watch = 'watch',
	watched = 'watched',
	thrown = 'thrown',
	liked = 'liked',
}

export interface ITranslation {
	id: number;
	title: string;
	type: string;
}

export class Anime {
	createdAt: Date;
	description: string;
	duration: number;
	episodesAired: number;
	episodesTotal: number;
	genres: string[];
	id: string;
	kind: string;
	link: string;
	mpaa: string;
	poster: string;
	rating: number;
	screenshots: string[];
	status: string;
	studios: string[];
	title: string;
	titleEn: string;
	translation: ITranslation;
	year: number;
}

export class Note {
	@Prop()
	favourite: NotesTypes;
	@Prop()
	animeId: number;
	@Prop()
	anime: Anime;
}

@Schema()
export class User {
	@Prop({ unique: true })
	username: string;

	@Prop({ default: 'blank.svg' })
	image: string;

	@Prop({ unique: true })
	email: string;

	@Prop({ default: false })
	isVerifiedEmail: boolean;

	@Prop()
	passwordHash: string;

	@Prop({ default: []})
	notes: Note[];

	@Prop({ default: [] })
	likedComments: Types.ObjectId[];

	@Prop({ default: new Date() })
	createdAt: Date = new Date();
}

export const UserModel = SchemaFactory.createForClass(User);
