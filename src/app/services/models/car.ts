import { Enterprise } from "./enterprise";
import {Agency} from "./agency";
import {Maintenance} from "./maintenance";

export class Car{
  public id:number;
  public constructorName:string;
  public model:string;
  public color:string;
  public year:string;
  public category:string;
  public trim:string;
  public fuel:string;
  public mileage:number;
  public gearbox:string;
  public registration:string;
  public available:boolean;
  public fiscalPower:number;
  public enterprise:Enterprise;
  public agency:Agency;
  public maintenance:Maintenance;
}
