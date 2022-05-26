import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: {
        email,
      },
    });
  }
}