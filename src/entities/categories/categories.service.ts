import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/db/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.findBYCategory(createCategoryDto.name)

    if (category) {
      throw new ConflictException('Category already exists.');
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);

    await this.categoryRepository.save(newCategory);
  }

  findBYCategory(name: string) {
    const categoryName = this.categoryRepository.findOne({ where: { name } });

    return categoryName
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
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
  


  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
