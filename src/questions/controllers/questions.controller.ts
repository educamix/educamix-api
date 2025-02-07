import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  async findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateQuestionDto: CreateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
