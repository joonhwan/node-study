import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class PasswordReset extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  token: string

  @Column()
  userId: number

  @CreateDateColumn()
  createdAt: Date
}