import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('newsletter')
export class NewsletterController {
    constructor(private readonly newsletterService: NewsletterService) { }

    @Post('subscribe')
    @UsePipes(new ValidationPipe())
    async subscribe(@Body() subscribeDto: SubscribeDto) {
        return this.newsletterService.subscribe(subscribeDto.email, subscribeDto.userName);
    }
}
