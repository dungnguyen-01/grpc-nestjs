import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:9191',
    package: [
                  'hero',
                  'net.java.grpc.server'
             ], 
    protoPath: [
                  join(__dirname, './hero/hero.proto'),
                  join(__dirname, './employee/employee_service.proto'),
  
                ],
  },
};