import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from '../car/car.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // наприклад, SUV, Sedan, Hatchback

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Car, (car) => car.category)
  cars: Car[];
}
