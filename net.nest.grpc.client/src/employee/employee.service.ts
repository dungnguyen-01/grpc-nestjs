import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc, GrpcStreamCall } from '@nestjs/microservices';
import { EmployeeEntity, EmployeeRequest, EmployeeService, Empty, MessageResponse } from './interfaces/employee.interfaces';
import { EmployeeDto } from './employee.dto/employee.dto';
import { EMPTY, Observable, ReplaySubject, Subject, toArray } from 'rxjs';
import { EmployeeResponse } from './employee.response/employee.response';

@Injectable()
export class EmployeesService {

    private employeeService : EmployeeService;

    constructor(@Inject('NET_NEST_GRPC_SERVER_PACKAGE') private readonly client: ClientGrpc) {}

    onModuleInit() {
      this.employeeService = this.client.getService<EmployeeService>('EmployeeService');
    }

    async create (employeeDto: EmployeeDto): Promise<MessageResponse> {

        const employeeRequest: EmployeeRequest = {
          name: employeeDto.name,
          address: employeeDto.address,
          phone: employeeDto.phone,
          jobTitle: employeeDto.job_title,
          salary: employeeDto.salary
        };
       
        console.log(employeeRequest);
      
        const message = this.employeeService.create(employeeRequest);


        return message;
    }

    async findAllEmployee(): Promise<EmployeeEntity[]> {  
      let empty : Empty;
      const employeeList: EmployeeEntity[] = [];

      return new Promise<EmployeeEntity[]>((resolve, reject) => {

        const stream = this.employeeService.findAllEmployee(empty);
        
        stream.subscribe({                
          next: (employee: EmployeeEntity) => {
            // Accumulate employees into the list
            employeeList.push(employee);
          },
          error: (error: any) => {
            // Handle any errors
            reject(error);
          },
          complete: () => {
            // Stream completed, resolve with the accumulated list
            resolve(employeeList);
          },
        });
      });
    }


    // @GrpcStreamCall('EmployeeService', 'findAllEmployee')
    // async findAllEmployee() : Promise<Observable<EmployeeEntity[]>> {

    //     const empty = new Subject<Empty>();

    //     empty.complete();
            
    //     const stream = this.employeeService.findAllEmployee(empty.asObservable());

    //     console.log(stream.pipe(toArray()));
        
              
    //     return stream.pipe(toArray());
    // }


}
