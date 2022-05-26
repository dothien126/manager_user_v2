import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto, UserDto, UserProfileDto } from './user.dto';
import { User, UserStatus } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(userDto: UserDto): Promise<User> {
    try {
      return await this.userRepository.save(userDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<User[]> {
    const user = await this.userRepository.find({});

    return user;
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  public async findByUserName(userName: string): Promise<User> {
    return await this.userRepository.findOne({ where: { userName: userName } });
  }

  public async updateByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });

      user.password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByPassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<User> {
    try {
      if (oldPassword === newPassword) {
        throw new ConflictException(`Your password not changed yet!`);
      }
      const user = await this.userRepository.findOne({ where: { email: email } });

      const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password!');
      }

      user.password = bcrypt.hashSync(newPassword, 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateProfile(id: string, userProfileDto: UserProfileDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      user.name = userProfileDto.name;
      user.email = userProfileDto.email;
      user.userName = userProfileDto.userName;

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async activeAccount(id: string) {
    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: UserStatus.ACTIVE })
      .where('id = :id', { id })
      .execute();
  }

  async resetPassword(id: string, password: string) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: hashPassword })
      .where('id = :id', { id })
      .execute();
  }

  async getMe(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'role', 'createdAt'],
    });
  }

  async edit(id: string, data: UpdateUserDto) {
    return this.userRepository.update(
      {
        id,
      },
      { ...data }
    );
  }

  async changePassword(filter: any) {
    const {id, newPassword} = filter;
    try {
      const password = bcrypt.hash(newPassword, 10);
      const user = await this.userRepository.findOne({where: {id}});
      user.password = String(password);

      const rs = await this.userRepository.save(user);
      return rs;
    } catch (error) {
      throw error;
    }
  }
}
