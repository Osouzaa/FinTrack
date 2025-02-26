import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/db/entities/user.entity";

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

  // Rota para buscar usuário por id (URL parameter)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }
}
