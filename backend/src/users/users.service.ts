import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    picture?: string;
    password?: string;
}

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(userData: UserData): Promise<User> {
        const user = new this.userModel(userData);
        return user.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async exists(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email }).exec();
        return !!user;
    }
}
