import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Profile } from './dto/profile.entity';
import { User } from './dto/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]) 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],  
})
export class UsersModule {}
