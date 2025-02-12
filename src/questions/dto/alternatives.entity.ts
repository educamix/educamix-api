import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './questions.entity';  
@Entity('tb_alternativas')
export class Alternative {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string; 

  @Column()
  correta: boolean; 

  @ManyToOne(() => Question, (question) => question.alternatives, { onDelete: 'CASCADE' })
  question: Question;
}
