import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsEmail,
} from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?[1-9][0-9]{7,14}$/)
  number: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  password: string;

  @IsString()
  job: string;
}
