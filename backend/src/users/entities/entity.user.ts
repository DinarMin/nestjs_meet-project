import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 20 })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
