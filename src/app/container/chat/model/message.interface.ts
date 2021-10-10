import { UserI } from './user.interface';
export interface MessageI{
    id?:string;
    message:string;
    createAt?:Date;
    user?:UserI;
    mine?:boolean;
}