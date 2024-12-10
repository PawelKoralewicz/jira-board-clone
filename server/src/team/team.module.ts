import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamMemberModule } from './team-member/team-member.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [TeamMemberModule],
})
export class TeamModule {}
