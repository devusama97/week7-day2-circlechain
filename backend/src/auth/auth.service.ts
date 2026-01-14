import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async login(user: any) {
        const payload = { email: user.email, sub: user.email, firstName: user.firstName, lastName: user.lastName, picture: user.picture };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                picture: user.picture,
            }
        };
    }

    async signup(firstName: string, lastName: string, email: string, password: string) {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });
        return this.login(user);
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
