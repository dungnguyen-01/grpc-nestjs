import { Module } from '@nestjs/common';
import { EmployeesService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NET_NEST_GRPC_SERVER_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
    
  ],
  providers: [EmployeesService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
