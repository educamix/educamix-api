import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlternativeDto {
  @IsOptional()
  id?: number;  

  @IsString()
  @IsNotEmpty()
  texto: string; 

  @IsBoolean()
  @IsNotEmpty()
  correta: boolean;
}
