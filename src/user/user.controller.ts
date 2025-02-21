import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard'; // custom guard taking AuthGuard

@UseGuards(JwtGuard) // requires token
// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }
}
