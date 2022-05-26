import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(to: string, content: string) {
    this.mailerService
      .sendMail({
        to,
        subject: 'Authentication user!',
        text: content,
        html: `<p>${content}</p>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
