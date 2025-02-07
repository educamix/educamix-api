import { IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  nome: string;

  @IsString()
  documento: string;

  @IsEmail()
  email: string;

  @IsString()
  usuario: string;

  @IsString()
  senha: string;

  @IsBoolean()
  ativo: boolean;

  @IsOptional()
  @IsString()
  idPerfilUsuario: string;
}
