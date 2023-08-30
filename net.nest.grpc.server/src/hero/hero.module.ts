import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-client.options';
import { HeroesController } from './heroes.controller';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'HERO_PACKAGE',
          ...grpcClientOptions,
        },
      ]),
    ],
    controllers: [HeroesController],
  })
  export class HeroModule {}