import {Role} from "./role";
import {Enterprise} from "./enterprise";

export class User{

    public id:number;
    public name:string;
    public username:string;
    public surname:string;
    public mail:string;
    public phone:string;
    public adress:string;
    public password:string;
    public city:string;
    public role:Role;
    public activated:boolean;
    public enterprise:Enterprise;
}
