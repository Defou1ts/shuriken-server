import { IsEnum, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Anime, NotesTypes } from '../user.model';

export class UserNoteDto {
	@IsEnum(NotesTypes)
	note: NotesTypes;

	@IsNumber()
	animeId: number;

	@IsObject()
	@ValidateNested()
	anime: Anime;
}
