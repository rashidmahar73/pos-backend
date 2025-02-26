import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/db/entity';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
     */

  constructor(private readonly userService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // User login
  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<any> {
    return this.userService.login(loginDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, updateUserDTO);
  }
}
