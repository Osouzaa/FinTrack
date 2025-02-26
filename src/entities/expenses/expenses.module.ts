import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/db/entities/expenses.entity';
import { Category } from 'src/db/entities/categories.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Expense, Category])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
