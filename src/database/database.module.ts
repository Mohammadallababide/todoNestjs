import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { IAppConfig, IDatabase } from '../app-config';
import { Todo } from '../todo-list/todo';
import { TodoList } from '../todo-list';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useFactory: (configService: ConfigService<IAppConfig>) => {
        const dbConfig = configService.get<IDatabase>('database');
        return {
          dialect: dbConfig.dialect,
          database: dbConfig.name,
          autoLoadModels: true,
          models: [Todo, TodoList],
          username: dbConfig.username,
          password: dbConfig.password,
          synchronize: true,
          sync: {
            force: true,
          },
          pool: {
            max: dbConfig.pool?.max,
            min: dbConfig.pool?.min,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
