import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubscribeDto {
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsOptional()
    @IsString()
    userName?: string;
}
