import { Module } from '@nestjs/common';

import { HeroModule } from './hero/hero.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [HeroModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
