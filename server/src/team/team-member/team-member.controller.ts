import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TeamMemberService } from './team-member.service';
import { TeamMemberGuard } from './guard/team-member.guard';
import { TeamMemberDto } from './dto';

@UseGuards(JwtGuard)
@Controller('team-members')
export class TeamMemberController {
  constructor(private teamMemberService: TeamMemberService) {}
  @Get(':team-id')
  @UseGuards(TeamMemberGuard)
  getTeamMembers(@Param('team-id') teamId: string) {
    const id = parseInt(teamId, 10);

    return this.teamMemberService.getTeamMembers(id);
  }

  @Post(':team-id')
  addTeamMember(@Body() dto: TeamMemberDto, @Param('team-id') teamId: string) {
    const id = parseInt(teamId, 10);
    return this.teamMemberService.addTeamMember(dto, id);
  }
}
