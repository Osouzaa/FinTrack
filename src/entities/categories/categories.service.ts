import { ConflictException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }


  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
