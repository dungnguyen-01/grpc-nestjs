import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employee.schema/employee.schema';
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
    MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
