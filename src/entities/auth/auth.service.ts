import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/db/entities/user.entity";
import { Repository } from "typeorm";
import type { LoginDto } from "./dto/login.dto";
import type { RegisterDto } from "./dto/register.dto";
import { ConflictException } from "@nestjs/common";
import { hash } from "bcryptjs";

interface SignInResponse {
  access_token: string;
}

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto) {
    console.log(loginDto)
    return null
  }

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.userRespository.findOne({
        where: {
          email: registerDto.email
        }
      })

      if (user) {
        throw new ConflictException('User already exists.');
      }

      const newUser = this.userRespository.create({
        ...registerDto,
        password_hash: await hash(registerDto.password, 6)
      })

      await this.userRespository.save(newUser)

    } catch (error) {
      
    }
  }
}