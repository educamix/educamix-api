import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Subject } from './subject.entity';  

@Entity('tb_perguntas')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'idTema' })
  subject: Subject;

  @Column()
  texto: string;

  @Column()
  nivelDificuldade: number;
}
