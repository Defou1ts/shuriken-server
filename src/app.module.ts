import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReviewsModule } from './reviews/reviews.module';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		ReviewsModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AuthModule,
		FilesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
