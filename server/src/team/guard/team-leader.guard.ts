import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TeamMemberRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamLeaderGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const teamId = parseInt(request.params.id, 10);

    if (!teamId) throw new ForbiddenException('Team ID is required.');

    const teamMember = await this.prismaService.teamMember.findFirst({
      where: {
        teamId,
        userId: user.id,
        role: TeamMemberRole.LEADER,
      },
    });

    if (!teamMember)
      throw new ForbiddenException(
        'Access forbidden. Only team leaders can update teams.',
      );

    return true;
  }
}
