import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from "typeorm";


export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({
    collection : 'employees',
    timestamps : true
})
export class Employee {

    @ObjectIdColumn()
    _id: string;

    @Prop({default : ''})
    name: string = '.';

    @Prop({default : ''})
    phone: string = '.';

    @Prop({default : ''})
    address: string = '';

    @Prop({default : ''})
    job_title: string = '';

    @Prop({default : 0})
    salary: number = 0;

    @Prop()
    @CreateDateColumn()
    created_at: Date;

    @Prop()
    @UpdateDateColumn()
    updated_at: Date;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);



