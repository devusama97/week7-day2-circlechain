import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from './schemas/subscriber.schema';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class NewsletterService {
    private readonly logger = new Logger(NewsletterService.name);
    private apiInstance: any;

    constructor(
        private configService: ConfigService,
        @InjectModel(Subscriber.name) private subscriberModel: Model<Subscriber>
    ) {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = this.configService.get<string>('BREVO_API_KEY');
        this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    }

    async subscribe(email: string, userName?: string) {
        try {
            this.logger.log(`Attempting to subscribe: ${email}`);
            
            // Check if already subscribed
            const existingSubscriber = await this.subscriberModel.findOne({ email });
            if (existingSubscriber) {
                if (existingSubscriber.isActive) {
                    throw new ConflictException('Email already subscribed to newsletter');
                } else {
                    // Reactivate subscription
                    existingSubscriber.isActive = true;
                    existingSubscriber.subscribedAt = new Date();
                    await existingSubscriber.save();
                    this.logger.log(`Reactivated subscription for: ${email}`);
                }
            } else {
                // Create new subscriber
                const newSubscriber = new this.subscriberModel({
                    email,
                    isActive: true,
                    subscribedAt: new Date(),
                });
                await newSubscriber.save();
                this.logger.log(`New subscriber saved: ${email}`);
            }
            
            // Send confirmation email
            await this.sendConfirmationEmail(email, userName);
            
            return { success: true, message: 'Subscribed successfully!' };
        } catch (error) {
            this.logger.error(`Failed to subscribe ${email}: ${error.message}`);
            if (error.response) {
                this.logger.error(`Brevo Error Response: ${JSON.stringify(error.response.body)}`);
            }
            throw error;
        }
    }

    private async sendConfirmationEmail(email: string, userName?: string) {
        const apiKey = this.configService.get<string>('BREVO_API_KEY');
        const fromEmail = this.configService.get<string>('FROM_EMAIL');

        if (!apiKey) {
            throw new Error('BREVO_API_KEY is missing in .env');
        }
        if (!fromEmail) {
            throw new Error('FROM_EMAIL is missing in .env');
        }

        const displayName = userName || 'Valued Subscriber';

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = '🎉 Welcome to Circlechain - Your Crypto Journey Begins!';
        sendSmtpEmail.htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Circlechain</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 255, 136, 0.2);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #00ff88 0%, #00d4ff 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #000; font-size: 32px; font-weight: 800; letter-spacing: -1px;">CIRCLECHAIN</h1>
                            <p style="margin: 10px 0 0 0; color: #000; font-size: 14px; font-weight: 600; letter-spacing: 2px;">CRYPTO PLATFORM</p>
                        </td>
                    </tr>
                    
                    <!-- Welcome Message -->
                    <tr>
                        <td style="padding: 50px 40px 30px 40px; text-align: center;">
                            <h2 style="margin: 0 0 20px 0; color: #00ff88; font-size: 28px; font-weight: 700;">Welcome Aboard, ${displayName}! 🚀</h2>
                            <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6;">Thank you for joining the Circlechain community! You've just taken the first step into the future of decentralized finance.</p>
                        </td>
                    </tr>
                    
                    <!-- Benefits Section -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 20px; background-color: rgba(0, 255, 136, 0.05); border-left: 4px solid #00ff88; margin-bottom: 15px;">
                                        <h3 style="margin: 0 0 10px 0; color: #00ff88; font-size: 18px; font-weight: 600;">📊 Market Insights</h3>
                                        <p style="margin: 0; color: #b8b8b8; font-size: 14px; line-height: 1.5;">Get real-time crypto market trends and analysis delivered to your inbox.</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 15px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background-color: rgba(0, 255, 136, 0.05); border-left: 4px solid #00d4ff; margin-bottom: 15px;">
                                        <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 18px; font-weight: 600;">🔔 Exclusive Updates</h3>
                                        <p style="margin: 0; color: #b8b8b8; font-size: 14px; line-height: 1.5;">Be the first to know about new features, platform updates, and special offers.</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 15px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background-color: rgba(0, 255, 136, 0.05); border-left: 4px solid #ff00ff; margin-bottom: 15px;">
                                        <h3 style="margin: 0 0 10px 0; color: #ff00ff; font-size: 18px; font-weight: 600;">💡 Expert Tips</h3>
                                        <p style="margin: 0; color: #b8b8b8; font-size: 14px; line-height: 1.5;">Learn from industry experts with our curated crypto trading strategies and guides.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                            <a href="http://localhost:3000" style="display: inline-block; padding: 16px 40px; background: linear-gradient(90deg, #00ff88 0%, #00d4ff 100%); color: #000; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);">Explore Platform</a>
                        </td>
                    </tr>
                    
                    <!-- Stats Section -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: rgba(0, 255, 136, 0.03); border-top: 1px solid rgba(0, 255, 136, 0.1); border-bottom: 1px solid rgba(0, 255, 136, 0.1);">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="33%" style="text-align: center; padding: 10px;">
                                        <h3 style="margin: 0 0 5px 0; color: #00ff88; font-size: 24px; font-weight: 700;">10K+</h3>
                                        <p style="margin: 0; color: #8b949e; font-size: 12px;">Active Users</p>
                                    </td>
                                    <td width="33%" style="text-align: center; padding: 10px; border-left: 1px solid rgba(0, 255, 136, 0.1); border-right: 1px solid rgba(0, 255, 136, 0.1);">
                                        <h3 style="margin: 0 0 5px 0; color: #00ff88; font-size: 24px; font-weight: 700;">$50M+</h3>
                                        <p style="margin: 0; color: #8b949e; font-size: 12px;">Trading Volume</p>
                                    </td>
                                    <td width="33%" style="text-align: center; padding: 10px;">
                                        <h3 style="margin: 0 0 5px 0; color: #00ff88; font-size: 24px; font-weight: 700;">24/7</h3>
                                        <p style="margin: 0; color: #8b949e; font-size: 12px;">Support</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center;">
                            <p style="margin: 0 0 15px 0; color: #8b949e; font-size: 14px;">Stay connected with us:</p>
                            <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="color: #00ff88; text-decoration: none; font-size: 12px;">Twitter</a>
                                    </td>
                                    <td style="padding: 0 10px; color: #8b949e;">•</td>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="color: #00ff88; text-decoration: none; font-size: 12px;">Discord</a>
                                    </td>
                                    <td style="padding: 0 10px; color: #8b949e;">•</td>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="color: #00ff88; text-decoration: none; font-size: 12px;">Telegram</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 20px 0 0 0; color: #8b949e; font-size: 11px; line-height: 1.5;">
                                You're receiving this email because you subscribed to Circlechain newsletter.<br>
                                © 2024 Circlechain. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
        sendSmtpEmail.sender = { name: 'Circlechain', email: fromEmail };
        sendSmtpEmail.to = [{ email: email }];

        return await this.apiInstance.sendTransacEmail(sendSmtpEmail);
    }
}
