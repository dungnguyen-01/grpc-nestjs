import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { EmployeeEntity, EmployeeRequest, Empty, FindEmployeeRequest, MessageResponse, ResponseEmployeeEntity } from './interfaces/employee.interfaces';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './employee.dto/employee.dto';
import { EmployeeResponse } from './employee.response/employee.response';
import { Metadata, ServerDuplexStream, ServerUnaryCall } from '@grpc/grpc-js';
import { Observable, Subject } from 'rxjs';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @GrpcMethod("EmployeeService", "create")
    async create(data : EmployeeRequest) : Promise<MessageResponse> {

        const employeeDto = new EmployeeDto();

        employeeDto.name = data.name;
        employeeDto.phone = data.phone;
        employeeDto.address = data.address;
        employeeDto.job_title = data.jobTitle;
        employeeDto.salary = data.salary;

        const employee = this.employeeService.create(employeeDto);

        let messageResponse: MessageResponse = {
            status: HttpStatus.OK,
            message: 'Create Employee Success!',
            empty: employee,
        };
        
        if (employee == null) {
            messageResponse.status = HttpStatus.BAD_REQUEST;
            messageResponse.message = "Create Employee Failed!";
        }

        console.log("===RUN create===");
        
        return messageResponse;
    }


    // @GrpcStreamMethod('EmployeeService', 'findAllEmployee')
    // async findAllEmployee(empty: Empty): Promise<Observable<EmployeeEntity>> {
     // const subject = new Subject<EmployeeEntity>();
    //  const mess = new Observable<EmployeeEntity>;
    //   // Subscribe to the gRPC stream and emit each employee to the subject
    //    mess.subscribe({
    //     next: async () => {
    //       // Fetch employees from the gRPC service and emit each one to the subject
    //       const employees: EmployeeEntity[] = await this.fetchEmployeesFromService();
    //       employees.forEach(employee => subject.next(employee));
    //     },
    //     complete: () => {
    //       subject.complete();
    //     },
    //   });
    //   console.log("===RUN===");
      
    //   return ;
    // }


    
    @GrpcMethod('EmployeeService', 'findAllEmployee')
    async findAllEmployee(message: Empty): Promise<Observable<EmployeeEntity>> {
    const subject = new Subject<EmployeeEntity>();

    const employees: EmployeeEntity[] = await this.fetchEmployeesFromService();

    const onNext = () => {
        employees.forEach(employee => subject.next(employee));
    };

    const onComplete = () => subject.complete();

    // You don't need to explicitly subscribe here; return the observable directly
    console.log("===RUN findAllEmployee===");

    // Use a timer to simulate streaming data
    setTimeout(() => {
        onNext();
        onComplete();
    }, 0); // Change this interval to match your needs

    return subject.asObservable();
    }

    private async fetchEmployeesFromService(): Promise<EmployeeEntity[]> {
    const employees: EmployeeEntity[] = new EmployeeResponse().mapToList(await this.employeeService.findAllEmployee());
    return employees;
    }


    // @GrpcStreamMethod("EmployeeService", "findAllEmployee")
    // async findAllEmployee(message: Observable<Empty>): Promise<Observable<EmployeeEntity>> {
    //     const subject = new Subject<EmployeeEntity>();

    // //    const employeeResponseList = new EmployeeResponse().mapToList(await this.employeeService.findAllEmployee());
      

    //     let employees : EmployeeEntity[] = new EmployeeResponse().mapToList(await this.employeeService.findAllEmployee());
       
    //     const onNext = () => {
    //         employees.forEach(x => {
    //             subject.next(x);
    //         })     

    //     }
    //     console.log("ddedddd");
        

    //     const onComplete = () => subject.complete();
    //     message.subscribe({
    //         next: onNext,
    //         complete: onComplete,
    //     });   

    //     return subject.asObservable();
    // }

    // @GrpcStreamMethod('EmployeeService', 'findAllEmployee')
    // async findAllEmployee(message: Observable<Empty>): Promise<Observable<EmployeeEntity>> {
    //   const subject = new Subject<EmployeeEntity>();
  
    //   // Subscribe to the gRPC stream and emit each employee to the subject
    //   message.subscribe({
    //     next: async () => {
    //       // Fetch employees from the gRPC service and emit each one to the subject
    //       const employees: EmployeeEntity[] = await this.fetchEmployeesFromService();
    //       employees.forEach(employee => subject.next(employee));
    //     },
    //     complete: () => {
    //       subject.complete();
    //     },
    //   });
    //   console.log("===RUN===");
      
    //   return subject.asObservable();
    // }




    // @GrpcStreamMethod("EmployeeService", "findEmployeeById")
    // async findEmployeeById(message: FindEmployeeRequest): Promise<Observable<ResponseEmployeeEntity>> {
    //     const subject = new Subject<EmployeeEntity>();

    // //    const employeeResponseList = new EmployeeResponse().mapToList(await this.employeeService.findAllEmployee());
      

    //     let employees : EmployeeEntity[] = new EmployeeResponse().mapToList(await this.employeeService.findAllEmployee());
       
    //     const onNext = () => {
    //         employees.forEach(x => {
    //             subject.next(x);
    //         })     

    //     }


    //     const onComplete = () => subject.complete();
    //     message.subscribe({
    //         next: onNext,
    //         complete: onComplete,
    //     });   

    //     return subject.asObservable();
    // }





    @GrpcStreamMethod("EmployeeService", "BidiHello")
        bidiHello(messages: Observable<any>, metadata: Metadata, call: ServerDuplexStream<any, any>): Observable<any> {
        const subject = new Subject();

        const onNext = message => {
            console.log(message);
            subject.next({
            reply: 'Hello, world!'
            });
        };
        const onComplete = () => subject.complete();
        messages.subscribe({
            next: onNext,
            complete: onComplete,
        });

        return subject.asObservable();
    }




    
}
