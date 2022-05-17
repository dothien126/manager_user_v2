import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserProfileDto } from './user.dto';
import { User, UserStatus } from './user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  public async create(userDto: UserDto): Promise<User> {
    try {
      return await this.userRepository.save(userDto)
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }

  public async findAll(): Promise<User[]> {
    const user = await this.userRepository.find({})

    return user;
  }

  public async findById(id: string): Promise<User> {

    return await this.userRepository.findOne({ where: { id: id } })
  }

  public async findByEmail(email: string): Promise<User> {

    return await this.userRepository.findOne({ where: { email: email } })
  }

  public async findByUserName(userName: string): Promise<User> {

    return await this.userRepository.findOne({ where: { userName: userName } })
  }

  public async updateByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } })

      user.password = bcrypt.hashSync(
        Math.random().toString(36).slice(-8), 8
      )

      return await this.userRepository.save(user)
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }

  public async updateByPassword(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });

      user.password = bcrypt.hashSync(password, 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }

  public async updateProfile(id: string, userProfileDto: UserProfileDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } })
      user.name = userProfileDto.name;
      user.email = userProfileDto.email;
      user.userName = userProfileDto.userName;

      return await this.userRepository.save(user)
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }

  public async activeAccount(id: string) {
    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: UserStatus.ACTIVE })
      .where('id = :id', { id })
      .execute()
  }
}
