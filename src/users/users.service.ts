import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Optional } from 'sequelize/types';
import { Op } from 'sequelize';
import { hash, compare } from 'bcryptjs';
import { UserType, LoginDto, UserDto } from './Users.dto';
import { User } from './users.model';
import { signToken } from './utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  async create(userType: Optional<UserType, any>): Promise<User> {
    try {
      const { email, password, username, phone } = userType;
      const check = await this.userModel.findOne({
        where: { [Op.or]: [{ username }, { phone }] },
      });
      let msg: string;
      if (check?.username === email) {
        msg = 'Email is used try another one';
      } else if (check?.phone === phone) {
        msg = 'Phone is used try another one';
      }
      if (msg) throw new BadRequestException(msg);
      const hashedPassword = await hash(password, 10);
      const sa = await this.userModel.create({
        ...userType,
        password: hashedPassword,
      });
      console.log(sa);
      return sa;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async login(userType: Optional<LoginDto, any>): Promise<UserDto> {
    console.log(process.env.HOST, process.env.USER_NAME, process.env.DATABASE);

    try {
      const { username, password } = userType;
      const user = await this.userModel.findOne({
        where: { username: username },
      });
      if (!user) throw new NotFoundException('User not found');
      const isMatch = await compare(password, user.password);
      if (!isMatch) throw new BadRequestException('Wrong password');
      const signTokenCookie = await signToken(user.username, user.id);
      return {
        id: user.id,
        username: user.username,
        phone: user.phone,
        email: user.email,
        token: signTokenCookie,
      };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async deleteUser(id: number): Promise<any> {
    try {
      return this.userModel.destroy({
        where: { id },
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
