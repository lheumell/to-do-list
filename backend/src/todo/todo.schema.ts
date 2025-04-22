import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: 'todo' | 'in-progress' | 'done';

  @Prop({ default: 'medium' })
  priority: 'low' | 'medium' | 'high';
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
