import { Employee } from "../employee.schema/employee.schema";
import { EmployeeEntity } from "../interfaces/employee.interfaces";

export class EmployeeResponse {
    id : number;
    name: string;
    phone: string;
    address: string;
    job_title: string;
    salary: number;



    constructor(entity?: Employee | EmployeeEntity) {
        this.name = entity ? entity.name : '';
        this.phone = entity ? entity.phone : '';
        this.address = entity ? entity.address : '';
        this.job_title = entity ? entity.job_title : '';
        this.salary = entity ? +entity.salary : 0;
    }

    public mapToList(entities: (Employee | EmployeeEntity)[]): EmployeeResponse[] {
        return entities.map(entity => new EmployeeResponse(entity));
    }

}