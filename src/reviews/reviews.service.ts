import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from 'src/auth/user.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { fromData, Review, ReviewDocument } from './reviews.model';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(Review.name) private reviewMovel: Model<ReviewDocument>,
		private readonly authService: AuthService,
	) {}

	async createReview(
		dto: CreateReviewDto,
		fromData: fromData,
	): Promise<Review> {
		return this.reviewMovel.create({ ...dto, from: fromData });
	}

	async findByAnime(animeId: string) {
		return this.reviewMovel
			.aggregate([
				{
					$match: {
						animeId: Number(animeId),
					},
				},
				{
					$addFields: {
						likes: { $size: { $ifNull: ['$likedBy', []] } },
						dislikes: { $size: { $ifNull: ['$dislikedBy', []] } },
					},
				},
				{
					$sort: {
						_id: -1,
					},
				},
			])
			.exec();
	}

	async likeById(id: string, user: UserDocument) {
		await this.reviewMovel
			.findByIdAndUpdate(
				id,
				{ $pull: { dislikedBy: user._id } },
				{ new: true },
			)
			.exec();
		const likedComment = await this.reviewMovel
			.findByIdAndUpdate(
				id,
				{ $addToSet: { likedBy: user._id } },
				{ new: true },
			)
			.exec();
		if (!likedComment) {
			throw new NotFoundException(REVIEW_NOT_FOUND);
		}
		await this.authService.addLikedComment(user._id, likedComment._id);
		return likedComment;
	}

	async disLikeById(id: string, user: UserDocument) {
		await this.reviewMovel
			.findByIdAndUpdate(
				id,
				{ $pull: { likedBy: user._id } },
				{ new: true },
			)
			.exec();
		const likedComment = await this.reviewMovel
			.findByIdAndUpdate(
				id,
				{ $addToSet: { dislikedBy: user._id } },
				{ new: true },
			)
			.exec();
		if (!likedComment) {
			throw new NotFoundException(REVIEW_NOT_FOUND);
		}
		await this.authService.addDisLikedComment(user._id, likedComment._id);
		return likedComment;
	}
}
