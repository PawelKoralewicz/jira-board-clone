import { IsNotEmpty, IsString } from 'class-validator';
import { AuthDto } from './auth.dto';

export class SignupDto extends AuthDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
