import { IsString, IsInt, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAlternativeDto } from './create-alternative.dto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  texto: string; 

  @IsInt()
  @IsNotEmpty()
  nivelDificuldade: number; 

  @IsInt()
  @IsNotEmpty()
  idTema: number; 

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativeDto)
  alternativas: CreateAlternativeDto[];
}
