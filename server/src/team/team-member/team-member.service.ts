import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamMemberDto } from './dto';
import { TeamMemberRole } from '@prisma/client';

@Injectable()
export class TeamMemberService {
  constructor(private prismaService: PrismaService) {}

  getTeamMembers(teamId: number) {
    return this.prismaService.teamMember.findMany({
      where: { teamId },
      include: { user: true },
    });
  }

  addTeamMember(dto: TeamMemberDto, teamId: number) {
    try {
      return this.prismaService.teamMember.create({
        data: {
          ...dto,
          teamId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  createMembers(members: TeamMemberDto[], teamId: number, creatorId: number) {
    const membersList: TeamMemberDto[] = members.map((member) => {
      const mbr: TeamMemberDto = { userId: member.userId, teamId: teamId };
      if (member.userId === creatorId) mbr.role = TeamMemberRole.LEADER;

      return mbr;
    });

    try {
      return this.prismaService.teamMember.createMany({
        data: membersList,
      });
    } catch (error) {
      throw error;
    }
  }

  updateMembers(members: TeamMemberDto[], teamId: number) {
    try {
      return this.prismaService.teamMember.updateMany({
        where: { teamId },
        data: members,
      });
    } catch (error) {
      throw error;
    }
  }
}
