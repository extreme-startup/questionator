import {
  Controller,
  Get,
  Request,
  Response,
  Post,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalPayload } from './local-payload.dto';
import { User } from '../../entity/User';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, type: User })
  async loginUser(@Response() res, @Body() body: LocalPayload, @Request() req) {
    if (!(body && body.email)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email is required!' });
    }
    try {
      const user = await this.authService.validateUser(body);
      req.session.user = user.id;
      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      if (!err) {
        const newUser = await this.authService.createUser(body);
        req.session.user = newUser.id;
        return res.status(HttpStatus.CREATED).json(newUser);
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err });
      }
    }
  }

  @Post('register')
  @ApiResponse({ status: 201, type: User })
  async registerUser(@Response() res, @Body() body: LocalPayload, @Request() req) {
    if (!(body && body.email)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email are required!' });
    }
    try {
      await this.authService.validateUser(body);
      return res.status(HttpStatus.FORBIDDEN)
        .json({ message: 'User already exist' });
    } catch (err) {
      if (!err) {
        const newUser = await this.authService.createUser(body);
        req.session.user = newUser;
        return res.status(HttpStatus.CREATED).json(newUser);
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err });
      }
    }
  }

  @Get('logout')
  async logoutUser(@Response() res, @Request() req) {
    if (req.session && req.cookies) {
      if (req.session.user && req.cookies['connect.sid']) {
        res.clearCookie('connect.sid');
        return res.status(HttpStatus.OK).json({message: 'Ok'});
      }
      return res.status(HttpStatus.UNAUTHORIZED).json({message: 'Not authorized'});
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({message: 'Not authorized'});
  }

  @Get('getUserAuthenticated')
  async getUserAuthenticated(@Response() res, @Request() req) {
    if (req.session && req.cookies) {
      return req.session.user && req.cookies['connect.sid'] ?
        res.status(HttpStatus.OK).json({user: req.session.user}) :
        res.status(HttpStatus.UNAUTHORIZED).json({user: null});
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({user: null});
  }
}
