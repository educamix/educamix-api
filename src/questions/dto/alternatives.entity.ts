import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './questions.entity';  
@Entity('tb_alternativas')
export class Alternative {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'idPergunta' })
  question: Question; 

  @Column()
  texto: string; 

  @Column()
  correta: boolean; 
}
