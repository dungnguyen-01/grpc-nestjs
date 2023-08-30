import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema/employee.schema';
import { Model } from 'mongoose';
import { EmployeeDto } from './employee.dto/employee.dto';
import { EmployeeResponse } from './employee.response/employee.response';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

    async create(employeeDto: EmployeeDto): Promise<Employee> {
        console.log("pass case 1");
        console.log(employeeDto);
        
        const createEmployee = new this.employeeModel(employeeDto);
        return createEmployee.save();
    }

    async findAllEmployee():Promise<Employee[]> {
        return await this.employeeModel.find();
    }

}
