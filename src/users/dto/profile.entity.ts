import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('systb_perfil_usuario')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoPerfil: string;
}
