import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserType {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserDto {
  id: number;
  username: string;
  phone: string;
  email: string;
  token: string | any;
}
