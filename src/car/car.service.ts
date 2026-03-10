import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    private categoryService: CategoryService,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const category = await this.categoryService.findOne(
      createCarDto.categoryId,
    );
    const car = this.carRepository.create({
      ...createCarDto,
      category,
    });
    return this.carRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return this.carRepository.find({ relations: ['category'] });
  }

  async findOne(carId: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id: carId },
      relations: ['category'],
    });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id);
    if (updateCarDto.categoryId) {
      const category = await this.categoryService.findOne(
        updateCarDto.categoryId,
      );
      car.category = category;
    }
    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(id: string): Promise<void> {
    const car = await this.findOne(id);
    await this.carRepository.remove(car);
  }
}
