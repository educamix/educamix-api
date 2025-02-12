import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Subject } from './subject.entity';  
import { Alternative } from './alternatives.entity';

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

  @OneToMany(() => Alternative, (alternative) => alternative.question, { cascade: true, eager: true })
  alternatives: Alternative[];
}
