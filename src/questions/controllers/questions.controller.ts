import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Perguntas')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra nova pergunta' })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consulta todas as perguntas' })
  async findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulta pergunta por id' })
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza os dados da pergunta' })
  async update(@Param('id') id: string, @Body() updateQuestionDto: CreateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a pergunta' })
  async remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
