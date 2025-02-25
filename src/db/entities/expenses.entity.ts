import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './catergories.entity';
import { User } from './user.entity';

@Entity('expenses')
export class Expense {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number; // Valor total da despesa

  @Column({ type: 'date' })
  date: Date; // Data em que a despesa foi realizada

  @Column({ default: false })
  isInstallment: boolean; // Indica se a despesa foi parcelada

  @Column({ nullable: true })
  installmentCount: number; // Quantidade de parcelas, se for parcelado

  @Column({ nullable: true })
  installmentValue: number; // Valor de cada parcela, se for parcelado

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: Category; // Relacionamento com a categoria

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: 'user_id' })
  user: User; // Relacionamento com o usuário

  @CreateDateColumn()
  createdAt: Date; // Data de criação do registro

}
