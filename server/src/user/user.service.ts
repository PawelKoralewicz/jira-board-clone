import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAllUsers() {
    return this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    });
  }
}
