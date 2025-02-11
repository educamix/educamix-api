import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './questions.entity';

@Entity('systb_materias')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;  

  @OneToMany(() => Question, (question) => question.subject)
  questions: Question[];
}
