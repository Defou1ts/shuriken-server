import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const getMailerConfig = async (configService: ConfigService): Promise<MailerOptions> => {
	return {
		transport: {
			host: 'smtp.sendgrid.net',
			auth: {
				user: 'apikey',
				pass: configService.get('SENDER_PASS'),
			},
		},
	};
};
