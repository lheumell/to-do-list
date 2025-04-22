import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Todo | null> {
    return await this.todoService.findById(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() newTodo: Todo,
  ): Promise<Todo | null> {
    const updatedTodo = await this.todoService.updateTodo(id, newTodo);
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return updatedTodo;
  }

  @Post()
  async createOne(@Body() todo: Todo): Promise<Todo> {
    return await this.todoService.createOne(todo);
  }

  @Delete()
  async deleteAll(): Promise<{ message: string }> {
    await this.todoService.deleteAll();
    return { message: 'All todos have been deleted' };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.todoService.deleteOne(id);
  }
}
