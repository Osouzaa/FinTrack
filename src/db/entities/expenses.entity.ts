import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './categories.entity';
import { User } from './user.entity';

@Entity('expenses')
export class Expense {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number; 

  @Column({ type: 'date' })
  date: Date; 

  @Column({ default: false })
  isInstallment: boolean; 

  @Column({ nullable: true })
  installmentCount: number; 

  @Column({ nullable: true })
  installmentValue: number; // Valor de cada parcela, se for parcelado

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: Category; 

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: 'user_id' })
  user: User; 

  @CreateDateColumn()
  createdAt: Date; 

}
