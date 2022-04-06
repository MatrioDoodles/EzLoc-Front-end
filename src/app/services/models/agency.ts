import {Enterprise} from "./enterprise";


export class Agency {
  public id:number;
  public  name:string;
  public  description:string;
  public  phone:string;
  public  landLineNumber:string;
  public  fax:string;
  public  adress:string;
  public  primaire:boolean;
  public  enterprise:Enterprise;
}
