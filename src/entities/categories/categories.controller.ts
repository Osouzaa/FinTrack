import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, createCategorySchema } from './dto/create.category.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation';
import { CurrentUser, type CurrentUserProps } from 'src/decorators/currentUser.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

 
  @Get()
  findAll(
    @Query('page') page: number = 1,      
    @Query('limit') limit: number = 10,    
    @Query('nameFilter') nameFilter: string = ''  
  ) {
    return this.categoriesService.findAll(page, limit, nameFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserProps) {
    return this.categoriesService.findOne(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserProps) {
    return this.categoriesService.remove(id, user);
  }
}
