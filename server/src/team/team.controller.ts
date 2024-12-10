import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TeamLeaderGuard } from './guard';
import { TeamService } from './team.service';
import { TeamDto } from './dto';

@UseGuards(JwtGuard)
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}
  @Get('my-teams')
  getMyTeams(@Req() req) {
    const userId = req.user.id;
    return this.teamService.getMyTeams(userId);
  }

  @Post()
  createTeam(@Body() dto: TeamDto, @Req() req) {
    const creatorId = req.user.id;
    return this.teamService.createTeam(dto, creatorId);
  }

  @Put(':id')
  @UseGuards(TeamLeaderGuard)
  updateTeam(@Body() dto: TeamDto, @Param('id') id: string) {
    const teamId = parseInt(id, 10);
    return this.teamService.updateTeam(dto, teamId);
  }
}
