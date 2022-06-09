import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LoginDto, UserDto, UserType } from './Types';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signup(@Body() userType: UserType): Promise<User> {
    return this.userService.create(userType);
  }
  @Post('login')
  login(@Body() userType: LoginDto): Promise<UserDto> {
    return this.userService.login(userType);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: number): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
