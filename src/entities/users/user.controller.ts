import { Controller, Get, Query } from "@nestjs/common";
import  { UserService } from "./user.service";
import  { User } from "src/db/entities/user.entity";

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService
  ) {}
  
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findByEmail(email: string) {
    return await this.userService.findByEmail(email);
  }
}