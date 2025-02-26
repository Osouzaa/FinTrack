import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/db/entities/categories.entity';
import { Repository } from 'typeorm';
import type { CurrentUserProps } from 'src/decorators/currentUser.decorator';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  // Método para criar uma categoria
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.findByCategory(createCategoryDto.name);

    if (category) {
      throw new ConflictException('Category already exists.');
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(newCategory);
  }

  async findByCategory(name: string) {
    const category = await this.categoryRepository.findOne({ where: { name } });
    return category;
  }

  async findAll(
    page: number = 1, 
    limit: number = 10, 
    nameFilter: string = ''
  ) {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
  
    if (nameFilter) {
      queryBuilder.where('category.name LIKE :name', { name: `%${nameFilter}%` });
    }
  
    queryBuilder.skip((page - 1) * limit).take(limit);
  
    // Executa a consulta
    const [categories, total] = await queryBuilder.getManyAndCount();
  
    return {
      data: categories,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  async findOne(id: string, user: CurrentUserProps) {
    const category = await this.categoryRepository.findOne({
      where: { id, user: { id: user.sub } },
      relations: ['expenses', 'expenses.user'],
    });

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    const totalDespensas = category.expenses.reduce((total, expense) => {
      return total + expense.amount; // Somando o valor das despesas
    }, 0);

    return {
      category,
      totalDespensas,
    };
  }

  // Método para remover uma categoria
  async remove(id: string, user: CurrentUserProps) {
    const category = await this.categoryRepository.findOne({
      where: { id, user: { id: user.sub } },
    });

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    await this.categoryRepository.remove(category);
   
  }
}
