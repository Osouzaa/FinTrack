import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { createExpenseSchema, type CreatedExpenseDto } from './dto/create.expense.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser, type CurrentUserProps } from 'src/decorators/currentUser.decorator';
import type { QueryExpenseDto } from './dto/query.expense.dto';

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
  findAll(@Query() query: QueryExpenseDto, @CurrentUser() user: CurrentUserProps) {
    return this.expensesService.findAll(query, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard) 
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserProps) {
    return this.expensesService.findOne(id, user); 
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateExpenseDto: CreatedExpenseDto, @CurrentUser() user: CurrentUserProps) {
    return this.expensesService.update(id, updateExpenseDto, user); 
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserProps) {
    return this.expensesService.remove(id, user); 
  }
}
