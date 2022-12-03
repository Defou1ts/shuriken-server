import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { UserIdValidationPipe } from 'src/pipes/userId-validation.pipe';
import { CreateReviewDto } from './dto/create-review.dto';
import { INVALID_REVIEW_ID, REVIEW_NOT_FOUND } from './review.constants';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewService: ReviewsService) {}

	@UseGuards(JwtAuthGuard)
	@HttpCode(201)
	@Post('create')
	async create(@Body(UserIdValidationPipe) dto: CreateReviewDto) {
		return this.reviewService.createReview(dto);
	}

	@Get('byAnime/:animeId')
	async getByAnime(@Param('animeId') animeId: string) {
		return this.reviewService.findByAnime(animeId);
	}

	@Get('like/:id')
	async likeById(@Param('id', IdValidationPipe) id: string) {
		return this.reviewService.likeById(id);
	}
}
