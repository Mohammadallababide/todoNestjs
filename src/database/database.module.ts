import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IAppConfig, IDatabase } from '../app-config';
import { Todo } from '../todo-list/todo';
import { TodoList } from '../todo-list';
import { User } from 'src/user/models/user.entity';
import { TypeOrmModule,TypeOrmModuleOptions } from '@nestjs/typeorm';


const typeormConfig : TypeOrmModuleOptions = {
  type:'postgres', 
  port: 5432,
  username:'postgres', 
  password:'Aa3#33$$Ff',
  database:'todo', 
  synchronize:true ,
  entities: [User],
}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService<IAppConfig>) => {
        const dbConfig = configService.get<IDatabase>('database', {
          infer: true,
        });
        return {
          dialect: dbConfig.dialect,
          database: dbConfig.name,
          autoLoadModels: true,
          models: [Todo, TodoList ],
          username: dbConfig.username,
          password: dbConfig.password,
          synchronize: false,
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
