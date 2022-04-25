import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class UserConfirmation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  confirmId: string
  
  @Column()
  userId: number
  
  @CreateDateColumn()
  createdAt: Date
 }