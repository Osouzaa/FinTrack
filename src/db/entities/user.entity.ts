import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import  { Expense } from "./expenses.entity";
import { Category } from "./categories.entity";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password_hash: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  
}