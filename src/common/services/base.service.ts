import { Injectable, NotFoundException } from '@nestjs/common';
// import { BaseNode } from 'src/db/entity/baseNode';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class BaseService<T extends any> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async createBase(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async updateBase(id: number, entity: Partial<T>): Promise<T> {
    const existingEntity = await this.findOne(id);
    if (!existingEntity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    Object.assign(existingEntity, entity);
    return this.repository.save(existingEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
  }

  // Additional common methods can be added here
  async findByCondition(condition: any): Promise<T[]> {
    return this.repository.find({ where: condition });
  }

  async count(condition?: any): Promise<number> {
    return this.repository.count({ where: condition });
  }

  async findWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ items: T[]; total: number }> {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { items, total };
  }
}
