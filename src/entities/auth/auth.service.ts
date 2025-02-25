import { InjectRepository } from "@nestjs/typeorm";
import  { User } from "src/db/entities/user.entity";
import  { Repository } from "typeorm";

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>
  ) {}

  async session() {
    return await this.userRespository.find();
  }
}