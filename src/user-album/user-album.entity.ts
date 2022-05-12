import { Album } from 'src/album/album.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum roleUserAlbum {
  OWNER = 'OWNER',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export enum userAlbumStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REJECTED = 'REJECTED',
}

export interface IUserAlbumEntity {
  id: string;

  role: roleUserAlbum;

  status: userAlbumStatus;
}

@Entity({ name: 'User-Album' })
export class UserAlbum implements IUserAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: roleUserAlbum, default: roleUserAlbum.OWNER })
  role: roleUserAlbum;

  @Column({
    type: 'enum',
    enum: userAlbumStatus,
    default: userAlbumStatus.INACTIVE,
  })
  status: userAlbumStatus;

  @ManyToOne(() => User, (user) => user.userAlbum, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Album, (album) => album.userAlbum, { onDelete: 'CASCADE' })
  album: Album;
}
