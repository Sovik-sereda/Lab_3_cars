import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from '../../car/entities/car.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // наприклад, SUV, Sedan, Hatchback

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Car, (car) => car.category)
  cars: Car[];
}
