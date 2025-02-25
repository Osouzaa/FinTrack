import { Controller, Post } from "@nestjs/common";
import  { AuthService } from "./auth.service";

@Controller('session')
export class AutheController {
  constructor (
    private authService: AuthService
  ) {

  }

  @Post()
  async session() {
    return await this.authService.session();
  }
}