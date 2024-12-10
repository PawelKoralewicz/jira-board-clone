import { TeamMemberRole } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class TeamMemberDto {
  @IsInt()
  @IsNotEmpty({ message: 'User ID not provided' })
  userId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Team ID not provided' })
  teamId: number;

  @IsEnum(TeamMemberRole)
  @IsOptional()
  role?: TeamMemberRole;
}
