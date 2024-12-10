import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export class TeamMemberGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const teamId = parseInt(request.params.id, 10);

    if (!teamId) throw new ForbiddenException('Team ID is required.');

    const teamMember = await this.prismaService.teamMember.findFirst({
      where: { teamId, userId: user.id },
    });

    if (!teamMember) {
      throw new ForbiddenException('You are not a member of this team.');
    }

    return true;
  }
}
