import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cats.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonResponse } from './interfaces/response.interface';

@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(cat: CreateCatDto): Promise<CommonResponse> {
    const res = await this.prisma.cat.create({
      data: {
        name: cat.name,
        breed: cat.breed,
        age: cat.age,
        color: cat.color,
        gender: cat.gender,
      },
    });
    if (!res) throw new Error('Failed to create cat');

    return { message: 'Successfully created YOUR cat!', body: res };
  }

  async getCatByID(id: number): Promise<Cat> {
    return await this.prisma.cat.findUnique({ where: { id: id } });
  }

  async deleteCatByID(id: number): Promise<CommonResponse> {
    const cat = await this.prisma.cat.findUnique({ where: { id: id } });
    if (!cat) throw new NotFoundException(`Cat with id "${id}" not found!`);

    const res = await this.prisma.cat.delete({ where: { id: id } });
    if (!res) throw new Error('Failed to delete cat');

    return { message: `Cat with id "${id}" succesfully deleted!`, body: cat };
  }

  async allCats(): Promise<Cat[]> {
    return await this.prisma.cat.findMany();
  }
}
