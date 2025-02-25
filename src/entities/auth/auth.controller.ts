import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import  { AuthService } from "./auth.service";
import { ZodValidationPipe } from "src/pipes/zod.validation";
import { loginSchema, type LoginDto } from "./dto/login.dto";
import  { RegisterDto, registerSchema } from "./dto/register.dto";

interface SignInResponse {
  access_token: string;
}
@Controller('session')
export class AutheController {
  constructor (
    private authService: AuthService
  ) {}

  
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async signIn(@Body() loginDto: LoginDto):Promise<SignInResponse> {
    return await this.authService.signIn(loginDto);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

}