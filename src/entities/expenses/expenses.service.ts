import { Injectable } from '@nestjs/common';
import  { CreatedExpenseDto } from './dto/create.expense.dto';
import  { Repository } from 'typeorm';
import  { Expense } from 'src/db/entities/expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>
  ) {

  }
  async create(createExpenseDto: CreatedExpenseDto, user:any ) {
    const expense =  this.expensesRepository.create({...createExpenseDto, user: user.sub})
    
    await this.expensesRepository.save(expense)

    return expense
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
