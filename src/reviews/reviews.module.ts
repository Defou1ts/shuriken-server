import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ReviewsController } from './reviews.controller';
import { Review, ReviewModel } from './reviews.model';
import { ReviewsService } from './reviews.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Review.name,
				schema: ReviewModel,
			},
		]),
		AuthModule
	],
	controllers: [ReviewsController],
	providers: [ReviewsService],
})
export class ReviewsModule {}
