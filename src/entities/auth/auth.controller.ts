import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import  { AuthService } from "./auth.service";
import { ZodValidationPipe } from "src/pipes/zod.validation";
import { loginSchema, type LoginDto } from "./dto/login.dto";
import  { RegisterDto } from "./dto/register.dto";

@Controller('session')
export class AutheController {
  constructor (
    private authService: AuthService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(loginSchema))
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

}