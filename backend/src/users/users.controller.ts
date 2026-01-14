import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        const user = await this.usersService.findByEmail(req.user.email);
        if (user) {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        }
        return {
            email: req.user.email,
            firstName: req.user.firstName || 'User',
            lastName: req.user.lastName || '',
            picture: req.user.picture || '',
        };
    }
}
