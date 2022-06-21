import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserLoginDTO, UserSignUpDTO } from '../dto';
import { UserWithToken } from '../../../common/types';
import { userControllerName } from 'src/common/constants';
import { User } from '../model/users.model';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/common/guards/auth.gard';

@Controller(userControllerName)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signup(@Body() userSignup: UserSignUpDTO): Promise<User> {
    return this.userService.create(userSignup);
  }
  @Post('login')
  login(@Body() userLogin: UserLoginDTO): Promise<UserWithToken> {
    return this.userService.login(userLogin);
  }
  @UseGuards(AuthGuard)
  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) id: number): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
