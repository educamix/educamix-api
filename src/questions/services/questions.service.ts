import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { CreateAlternativeDto } from '../dto/create-alternative.dto';
import { getManager } from 'typeorm';  // Importando o gerenciador de entidades para acesso direto à tabela
import { Alternative } from '../dto/alternatives.entity';
import { Question } from '../dto/questions.entity';
import { Subject } from '../dto/subject.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,

    @InjectRepository(Alternative)
    private alternativesRepository: Repository<Alternative>,  // Repositório para Alternativas
  ) {}

  // Cria uma nova pergunta com alternativas
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { texto, nivelDificuldade, idTema, alternativas } = createQuestionDto;

    // Acessa diretamente a tabela 'systb_materias' para obter o Tema (Subject)
    const subject = await this.questionsRepository.manager.findOne(Subject, { where: { id: idTema } });

    if (!subject) {
      throw new Error('Tema não encontrado');
    }

    // Cria a nova pergunta
    const question = this.questionsRepository.create({
      texto,
      nivelDificuldade,
      subject,  // Associando o Tema (Subject) à Pergunta
    });

    // Salva a pergunta
    await this.questionsRepository.save(question);

    // Cria as alternativas associadas à pergunta
    const alternativeEntities = alternativas.map((alt: CreateAlternativeDto) => {
      const alternative = this.alternativesRepository.create({
        texto: alt.texto,
        correta: alt.correta,
        question,  // Associando a pergunta com a alternativa
      });
      return alternative;
    });

    // Salva as alternativas
    await this.alternativesRepository.save(alternativeEntities);

    // Retorna a pergunta com as alternativas
    return this.questionsRepository.findOne({
      where: { id: question.id },
      relations: ['subject', 'alternatives'],  // Inclui as alternativas associadas
    });
  }

  // Retorna todas as perguntas
  async findAll(): Promise<Question[]> {
    return this.questionsRepository.find({ relations: ['subject', 'alternatives'] });
  }

  // Retorna uma pergunta específica
  async findOne(id: string): Promise<Question> {
    return this.questionsRepository.findOne({ where: { id: +id }, relations: ['subject', 'alternatives'] });
  }

  // Atualiza uma pergunta
  async update(id: string, updateQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = await this.questionsRepository.findOne({ where: { id: +id } });
    if (!question) {
      throw new Error('Pergunta não encontrada');
    }

    question.texto = updateQuestionDto.texto;
    question.nivelDificuldade = updateQuestionDto.nivelDificuldade;
    question.subject = await this.questionsRepository.manager.findOne(Subject, { where: { id: updateQuestionDto.idTema } });

    const savedQuestion = await this.questionsRepository.save(question);

    // Atualiza as alternativas (verificando se o 'id' existe para realizar a atualização)
    for (let alt of updateQuestionDto.alternativas) {
      if (alt.id) {  // Se o 'id' estiver presente, é uma atualização
        const alternative = await this.alternativesRepository.findOne({ where: { id: alt.id } });
        if (alternative) {
          alternative.texto = alt.texto;
          alternative.correta = alt.correta;
          await this.alternativesRepository.save(alternative);
        }
      } else {  // Caso contrário, criamos uma nova alternativa
        const alternative = this.alternativesRepository.create({
          texto: alt.texto,
          correta: alt.correta,
          question: savedQuestion,  // Associando a pergunta com a alternativa
        });
        await this.alternativesRepository.save(alternative);
      }
    }

    return savedQuestion;
  }

  // Exclui uma pergunta
  async remove(id: string): Promise<void> {
    const question = await this.questionsRepository.findOne({ where: { id: +id } });
    if (!question) {
      throw new Error('Pergunta não encontrada');
    }

    await this.questionsRepository.delete(id);
  }
}
