import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop()
  title: string;

  @Prop()
  done: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
