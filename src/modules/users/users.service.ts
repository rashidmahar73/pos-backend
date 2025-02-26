import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { BaseService } from 'src/common/services/base.service';
import { LoginUserDto } from './dto/login-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository); // Pass the repository to the base service
  }

  // user create service
  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      await this.createBase(createUserDto);

      return {
        status: 200,
        message: 'User registered successfully',
      };
    } catch (error) {
      return {
        status: error.status || 500,
        message: error.message || 'User registration failed',
      };
    }
  }

  // Validate and authenticate user
  async login(loginDto: LoginUserDto): Promise<{
    message: string;
    status: number;
    user:
      | {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        }
      | {};
  }> {
    const { email, password } = loginDto;

    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user || email !== user.email) {
      return {
        message: 'User not found',
        status: HttpStatus.NOT_FOUND,
        user: {},
      };
    }

    // Compare the password (plain text)
    if (password !== user.password) {
      return {
        message: 'Invalid credentials',
        status: HttpStatus.UNAUTHORIZED,
        user: {},
      };
    }

    // Return success message if passwords match
    return { message: 'Login successful', status: HttpStatus.OK, user: user };
  }

  // find all user
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<any> {
    try {
      await this.updateBase(id, updateUserDTO); 

      return {
        status: 200,
        message: 'User Updated successfully',
      };
    } catch (error) {
      return {
        status: error.status || 500,
        message: error.message || 'User Update failed',
      };
    }
  }

  // Define a method to find a user by ID
  async findUserById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
