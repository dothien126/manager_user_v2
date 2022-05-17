import { NotFoundException } from '@nestjs/common';

export class AlbumNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.postNotFound', error);
  }
}