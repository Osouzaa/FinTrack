import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/db/entities/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { compare, hash } from "bcryptjs";
import { UserService } from "../users/user.service";

interface SignInResponse {
  access_token: string;
}

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto): Promise<SignInResponse> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordMatches = await compare(loginDto.password, user.password_hash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

async register(registerDto: RegisterDto) {
  
  const existingUser = await this.userService.findByEmail(registerDto.email);
  if (existingUser) {
    throw new ConflictException('Email already in use.');
  }

  const newUser = this.userRespository.create({
    ...registerDto,
    password_hash: await hash(registerDto.password, 6),
  });

  await this.userRespository.save(newUser);
}

}
