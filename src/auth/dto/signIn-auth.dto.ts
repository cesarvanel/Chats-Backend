import { IsNotEmpty, IsString, Length, Matches,  IsEmail } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  password: string;
}
