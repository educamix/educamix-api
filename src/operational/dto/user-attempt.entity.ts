import { Alternative } from 'src/questions/dto/alternatives.entity';
import { Question } from 'src/questions/dto/questions.entity';
import { User } from 'src/users/dto/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tb_tentativas')
export class UserAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'idUsuario' })
  user: User;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'idPergunta' })
  question: Question;

  @ManyToOne(() => Alternative)
  @JoinColumn({ name: 'idAlternativa' })
  alternative: Alternative;

  @Column()
  correta: boolean;

  @Column()
  dtTentativa: Date;
}
