import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Subscriber extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: Date.now })
    subscribedAt: Date;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
