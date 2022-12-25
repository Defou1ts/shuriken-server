import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { AuthModule } from 'src/auth/auth.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/src/assets/users`,
			serveRoot: '/static',
		}),
		AuthModule,
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
