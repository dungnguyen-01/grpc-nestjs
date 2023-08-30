import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-client.options';
import { HeroService } from './hero.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
    
  ],
  controllers: [HeroController],
  providers: [HeroService]
})
export class HeroModule {}
