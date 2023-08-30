import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { EmployeesService } from './employee.service';
import { EmployeeResponse } from './employee.response/employee.response';
import { Observable, ReplaySubject } from 'rxjs';
import { EmployeeEntity, Empty, MessageResponse } from './interfaces/employee.interfaces';
import { EmployeeDto } from './employee.dto/employee.dto';

@Controller('api/v1/employees')
export class EmployeeController {

    constructor(private readonly employeesService : EmployeesService) {}

    @Get()
    findAllEmployee(): Promise<EmployeeEntity[]> {
     //   const em :  EmployeeResponse[] = new EmployeeResponse().mapToList(this.employeeService.findAllEmployee());
        return this.employeesService.findAllEmployee();
    }

    @Post("create")
    create(@Body() employeeDto: EmployeeDto): Promise<MessageResponse>{       
        return this.employeesService.create(employeeDto);
    }

}
