import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatedExpenseDto } from './dto/create.expense.dto';
import { Repository, type FindOptionsWhere } from 'typeorm';
import { Expense } from 'src/db/entities/expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/db/entities/categories.entity';
import { User } from 'src/db/entities/user.entity';
import { CurrentUserProps } from 'src/decorators/currentUser.decorator';
import type { QueryExpenseDto } from './dto/query.expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  async create(createExpenseDto: CreatedExpenseDto, user: CurrentUserProps) {
    // Verificando se a categoria existe
    const category = await this.categoriesRepository.findOne({
      where: { id: createExpenseDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      category, // Associa a categoria corretamente
      user: { id: user.sub } as User,
    });

    await this.expensesRepository.save(expense);
    return expense;
  }

  async findAll(query: QueryExpenseDto, user: CurrentUserProps) {
    const { amount, categoryId, date, installmentCount, installmentValue, isInstallment, limit, page } = query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;

    const skip = (pageNumber - 1) * pageSize;

    const where: FindOptionsWhere<Expense> = {
      user: { id: user.sub }, // Filtrando as despesas pelo usuário logado
    };

    if (amount) {
      where.amount = amount;
    }

    if (categoryId) {
      where.category = { id: categoryId }; 
    }

    if (date) {
      where.date = date;
    }

    if (installmentCount) {
      where.installmentCount = installmentCount;
    }

    if (installmentValue) {
      where.installmentValue = installmentValue;
    }

    if (isInstallment) {
      where.isInstallment = isInstallment;
    }

    const [expenses, total] = await this.expensesRepository.findAndCount({
      where,
      take: pageSize,
      skip,
      relations: ['category', 'user'],
    });

    return {
      data: expenses,
      total,
      page: pageNumber,
      limit: pageSize,
    };
  }

  async findOne(id: string, user: CurrentUserProps) {
    const expense = await this.expensesRepository.findOne({
      where: { id, user: { id: user.sub } }, 
      relations: ['category', 'user'],
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async update(id: string, updateExpenseDto: any, user: CurrentUserProps) {
    const expense = await this.expensesRepository.findOne({
      where: { id, user: { id: user.sub } }, 
    });

    if (!expense) { 
      throw new NotFoundException('Expense not found');
    }

    Object.assign(expense, updateExpenseDto);
    return this.expensesRepository.save(expense);
  }

  async remove(id: string, user: CurrentUserProps) {
    const expense = await this.expensesRepository.findOne({
      where: { id, user: { id: user.sub } }, 
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    await this.expensesRepository.remove(expense); 
  }
}
