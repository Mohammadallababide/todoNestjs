import { Module } from '@nestjs/common';
import { TodoModule } from './todo-list';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';

@Module({
  imports: [AppConfigModule, DatabaseModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
