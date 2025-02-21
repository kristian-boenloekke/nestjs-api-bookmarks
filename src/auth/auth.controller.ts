import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { Request } from "express";
import { AuthDto } from "./dto";


//adding a prefix to the @Controller({}), in this case 'auth', we provide the name of the route i.e. /auth/signin
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @HttpCode(200)
    // @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() dto: AuthDto) {    
        return this.authService.signup(dto)
    }
    
    @HttpCode(200)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}


