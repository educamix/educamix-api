import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('systb_materias')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;  
}
