import { Injectable } from '@nestjs/common';
import  { CreatedExpenseDto } from './dto/create.expense.dto';
import  { Repository } from 'typeorm';
import  { Expense } from 'src/db/entities/expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import  { Category } from 'src/db/entities/categories.entity';
import  { User } from 'src/db/entities/user.entity';
import  { CurrentUserProps } from 'src/decorators/currentUser.decorator';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>
  ) {

  }
  async create(createExpenseDto: CreatedExpenseDto, user: CurrentUserProps) {
    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      category: { id: createExpenseDto.categoryId } as Category, 
      user: { id: user.sub } as User, 
    });
  
    await this.expensesRepository.save(expense);
    return expense;
  }

  findAll() {
    return `This action returns all expenses`;
  }

  async findOne(id: string) {
    const expense = await this.expensesRepository.findOne({
       where: { id },
       relations: ['category', 'user']
    });
 
    if (!expense) {
       throw new Error('Expense not found');
    }
 
    return expense;
 }
 


  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
