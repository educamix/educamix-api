import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('systb_usuario_sistema')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'idPerfilUsuario' })
  profile: Profile;

  @Column()
  nome: string;

  @Column()
  documento: string;

  @Column()
  email: string;

  @Column()
  usuario: string;

  @Column()
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  @Column()
  dtCadastro: Date;

  @Column({ nullable: true })
  dtExclusao: Date;

  @Column({ nullable: true })
  idUsuarioExclusao: number;
}
