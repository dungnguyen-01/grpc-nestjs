import { Controller, Get, Param } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroById } from './interfaces/hero.interface';



@Controller('api/v1/hero')
export class HeroController {

  constructor(private readonly heroService : HeroService) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
      const hero = await this.heroService.findOne({ id });
      return hero;
    }
    
}
