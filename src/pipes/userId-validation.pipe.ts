import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { USERID_VALIDATION_ERROR } from './userId-validation.constants';

@Injectable()
export class UserIdValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (metadata.type != 'body') {
			return value;
		}
		if (!Types.ObjectId.isValid(value.userId)) {
			throw new BadRequestException(USERID_VALIDATION_ERROR);
		}
		return value;
	}
}
