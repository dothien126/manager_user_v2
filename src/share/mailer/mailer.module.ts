import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path'

@Module({
  imports: [MailerModule.forRoot({
    // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    // or
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    defaults: {
      from: 'thiendv',
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  ],
  providers: [MailService],
  exports: [MailService],     // 👈 export for DI
})
export class MailModule { }