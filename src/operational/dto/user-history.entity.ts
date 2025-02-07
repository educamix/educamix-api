import { User } from 'src/users/dto/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tb_historico_tentativas')
export class UserHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'idUsuario' })
  user: User;

  @Column()
  totalTentativas: number;

  @Column()
  totalAcertos: number;

  @Column('decimal', { precision: 5, scale: 2 })
  percentualAcertos: number;

  @Column()
  dtAtualizacao: Date;
}
