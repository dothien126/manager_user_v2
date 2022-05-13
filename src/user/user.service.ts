import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

export interface IPaginationOptions {
    page: number;
    limit: number;
  }

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    create(createProfileDto: CreateUserDto) {
        return this.userRepository.save(
          this.userRepository.create(createProfileDto),
        );
      }
    
      findManyWithPagination(paginationOptions: IPaginationOptions) {
        return this.userRepository.find({
          skip: (paginationOptions.page - 1) * paginationOptions.limit,
          take: paginationOptions.limit,
        });
      }
    
      findOne() {
        return this.userRepository.findOne({
        
        });
      }
    
      update(id: number, updateProfileDto: UpdateUserDto) {
        return this.userRepository.save(
          this.userRepository.create({
          }),
        );
      }
    
      async softDelete(id: number): Promise<void> {
        await this.userRepository.softDelete(id);
      }
}
