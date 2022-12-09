import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReviewsModule } from './reviews/reviews.module';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from './configs/mailer.config';
import { MailModule } from './mail/mail.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		ReviewsModule,
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailerConfig,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AuthModule,
		FilesModule,
		MailModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
