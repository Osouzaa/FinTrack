import { ConflictException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/db/entities/user.entity";
import { Repository } from "typeorm";
import type { UpdatedUserDto } from "./dto/updated.user.dto";

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['expenses', 'expenses.category'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updated(id: string, updatedUserDto: UpdatedUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (updatedUserDto.email) {
      const existingUser = await this.findByEmail(updatedUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    if (!Object.keys(updatedUserDto).length) {
      throw new ConflictException('No data provided to update');
    }

    try {
      const updatedUser = {
        ...user,
        ...updatedUserDto,
      };

      await this.userRepository.save(updatedUser);
    } catch (error) {
      throw new ConflictException('Error updating user');
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    try {
      await this.userRepository.remove(user);
    } catch (error) {
      throw new ConflictException('Error removing user');
    }
  }
}
