import { Body, Controller, Delete, Get, Param, Patch, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/db/entities/user.entity";
import type { UpdatedUserDto } from "./dto/updated.user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService
  ) {}

  // Rota para buscar todos os usuários
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('by-email')
  async findByEmail(@Query('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async updated(@Param('id') id: string, @Body() updatedUserDto: UpdatedUserDto) {
    return await this.userService.updated(id, updatedUserDto);
  }


  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
