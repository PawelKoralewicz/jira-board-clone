import { Module } from '@nestjs/common';
import { TeamMemberController } from './team-member.controller';
import { TeamMemberService } from './team-member.service';

@Module({
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
})
export class TeamMemberModule {}
