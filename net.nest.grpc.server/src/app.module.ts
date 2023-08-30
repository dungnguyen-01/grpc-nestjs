import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/grpc_db'),
    HeroModule,
    EmployeeModule,
  ],
  // controllers: [AppController, HeroesController],
  // providers: [AppService],
})
export class AppModule {}
