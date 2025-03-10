
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './env';
import { DatabaseModule } from './db/db.config';
import { UserModule } from './entities/users/user.module';
import { AuthModule } from './entities/auth/auth.module';
import { ExpensesModule } from './entities/expenses/expenses.module';
import { CategoriesModule } from './entities/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ExpensesModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
