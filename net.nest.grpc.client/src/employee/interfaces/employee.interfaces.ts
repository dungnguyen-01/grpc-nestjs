import { Observable } from "rxjs";

export interface Empty{}

export interface EmployeeRequest {
    name: string;
    phone: string;
    address: string;
    jobTitle: string;
    salary: number;
}

export interface MessageResponse {
	status: number;
	message: string;
	empty: Empty;
}


export interface EmployeeEntity {
    id: number;
    name: string;
    phone: string;
    address: string;
    job_title: string;
    salary: number;
}


export interface ResponseEmployeeEntity {
    status: number;
	message: string;
    employeeEntity: EmployeeEntity;

}

export interface  FindEmployeeRequest {
    employee_id: number;
}


export interface EmployeeService {

     create(employeeRequest: EmployeeRequest): Promise<MessageResponse>;
     findAllEmployee(empty: Empty): Observable<EmployeeEntity>;
	// findEmployeeById(FindEmployeeRequest) returns (ResponseEmployeeEntity);
    // bidiHello(upstream: Observable<HelloRequest>): Observable<HelloResponse>;

  }
  
  interface HelloRequest {
    greeting: string;
  }
  
  interface HelloResponse {
    reply: string;
  }


