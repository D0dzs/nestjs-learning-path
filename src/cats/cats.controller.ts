import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cats.interface';

interface CommonResponse {
	message: string;
	body: any;
}

@Controller('cats')
export class CatsController {
	constructor(private readonly catsService: CatsService) {}

	@Get()
	async getCats(@Query('id') id?: string): Promise<CommonResponse> {
		if (id) {
			const cat = await this.catsService.getCatByID(Number(id));
			if (!cat) throw new NotFoundException(`Cat with id "${id}" not found!`);

			return { message: 'This endpoint returns a cat by id!', body: cat };
		} else {
			const cats = await this.catsService.allCats();

			return {
				message: 'This endpoint returns all cats!',
				body: cats,
			};
		}
	}

	@Get('random')
	async randomCat(): Promise<CommonResponse> {
		const cats = await this.catsService.allCats();
		const randomIndex = Math.floor(Math.random() * cats.length);
		return {
			message: 'This endpoint will return a random cat!',
			body: cats[randomIndex],
		};
	}

	@Post('create')
	async create(@Body() createCatDto: CreateCatDto) {
		if (!createCatDto.age || !createCatDto.breed || !createCatDto.color || !createCatDto.gender || !createCatDto.name)
			throw new BadRequestException('All fields are required!');

		const res = await this.catsService.create(createCatDto);
		return res;
	}

	@Delete('delete')
	async deleteCat(@Query('id') id: string): Promise<{ message: string; body: Cat }> {
		const res = await this.catsService.deleteCatByID(Number(id));
		if (!res) throw new NotFoundException(`Cat with id "${id}" not found!`);

		return res;
	}
}
