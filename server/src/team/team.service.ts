import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamDto } from './dto';
import { TeamMemberService } from './team-member/team-member.service';

@Injectable()
export class TeamService {
  constructor(
    private prismaService: PrismaService,
    private teamMemberService: TeamMemberService,
  ) {}

  getMyTeams(userId: number) {
    return this.prismaService.team.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
      },
    });
  }

  async createTeam(dto: TeamDto, creatorId: number) {
    try {
      const team = await this.prismaService.team.create({
        data: {
          name: dto.name,
          descritption: dto?.description,
        },
      });

      const members = await this.teamMemberService.createMembers(
        dto.members,
        team.id,
        creatorId,
      );

      return { team, members };
    } catch (error) {
      throw error;
    }
  }

  async updateTeam(dto: TeamDto, teamId: number) {
    try {
      const team = await this.prismaService.team.update({
        where: {
          id: teamId,
        },
        data: {
          name: dto.name,
          descritption: dto?.description,
        },
      });

      const members = await this.teamMemberService.updateMembers(
        dto.members,
        teamId,
      );

      return { team, members };
    } catch (error) {
      throw error;
    }
  }
}
