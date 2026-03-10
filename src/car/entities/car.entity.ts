import { Category } from '../../category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => Category, (category) => category.cars, { eager: true })
  category: Category;
}
