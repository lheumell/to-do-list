import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async createOne(todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }

  async updateTodo(id: string, newTodo: Todo): Promise<Todo | null> {
    return this.todoModel
      .findByIdAndUpdate(id, { $set: newTodo }, { new: true })
      .exec();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todoModel.findById(id).exec();
  }

  async deleteAll(): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.todoModel.deleteMany({}).exec();
  }

  async deleteOne(
    id: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.todoModel.deleteOne({ _id: id }).exec();
  }
}
