import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/db/entities/user.entity";
import { AutheController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AutheController],
  providers: [AuthService]
})

export class AuthModule {}