import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './expenses.entity';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Nome da categoria (Alimentação, Transporte, Lazer, etc.)

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
