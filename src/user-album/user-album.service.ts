import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Album } from "src/album/album.entity";
import { AlbumService } from "src/album/album.service";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { InviteToAlbum } from "./dto/invite-album.dto";

@Injectable()
export class UserAlbumService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}
  
  private sendMailInvite(user, link): void {
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'from@example.com',
        subject: 'Invite to Album',
        text: 'Invite to Album!',
        template: 'index',
        context: {
          title: 'Invite to Album',
          link,
          description: `In order to complete registration please click Invite`,
        },
      })
      .then(() => {
        console.log('Invite User: Send Mail Invite successfully!');
      })
      .catch(() => {
        console.log('Invite User: Send Mail Invite Failed!');
      });
  }

  async invite(data: InviteToAlbum) {
    try {
      const user = await this.userService.findByEmail(data.email);
      if (!user) {
        return new NotFoundException('User email not found!');
      }

      const album = await this.albumService.findOne(data.albumId);
      if (!album) {
        return new NotFoundException('Email dose not exist!');
      }

      const payload = {
        email: data.email,
        albumId: data.albumId,
      };
      const inviteToken = this.jwtService.sign(payload);
      const link = `localhost:3000/album/handle/${inviteToken}`;
      this.sendMailInvite(data.email, link);
      return;
    } catch (error) {
      return new Error(error);
    }
  }
}