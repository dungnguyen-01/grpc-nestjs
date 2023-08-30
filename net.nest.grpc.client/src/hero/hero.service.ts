import { Inject, Injectable } from '@nestjs/common';
import { Hero, HeroesService } from './interfaces/hero.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { HeroById } from './interfaces/hello.dto';
import { Observable } from 'rxjs';

@Injectable()
export class HeroService {
    private heroesService: HeroesService;

    constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

    onModuleInit() {
      this.heroesService = this.client.getService<HeroesService>('HeroesService');
    }

    async findOne(id: HeroById): Promise<Hero> {
        const response = await this.heroesService.findOne(id);
        return response;
      }
}
