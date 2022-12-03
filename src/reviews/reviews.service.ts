import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './reviews.model';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(Review.name) private reviewMovel: Model<ReviewDocument>,
	) {}

	async createReview(dto: CreateReviewDto): Promise<Review> {
		return this.reviewMovel.create(dto);
	}

	async findByAnime(animeId: string) {
		return this.reviewMovel.find({ animeId }).exec();
	}

	async likeById(id: string) {
		return this.reviewMovel
			.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
			.exec();
	}
}
