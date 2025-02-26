import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import {  createExpenseSchema, type CreatedExpenseDto } from './dto/create.expense.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser, type CurrentUserProps } from 'src/decorators/currentUser.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body(new ZodValidationPipe(createExpenseSchema)) createExpenseDto: CreatedExpenseDto,
    @CurrentUser() user: CurrentUserProps,
  ) {
  return this.expensesService.create(createExpenseDto, user);
  }
  

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
