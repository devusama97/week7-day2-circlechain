import { Controller, Get, Post, Body, UseGuards, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(
            signupDto.firstName,
            signupDto.lastName,
            signupDto.email,
            signupDto.password
        );
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        const token = await this.authService.login(req.user);
        return res.redirect(`${process.env.FRONTEND_URL}/login/callback?token=${token.access_token}`);
    }
}
