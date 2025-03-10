import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/db/entities/user.entity";
import { AutheController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { env } from "src/env";
import { UserModule } from "../users/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: env.JWT_SECRET,
    signOptions: {
      expiresIn: '7d'
    },
  }), UserModule],
  controllers: [AutheController],
  providers: [AuthService],
})

export class AuthModule {}