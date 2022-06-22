import { Enterprise } from "./enterprise";
import {Agency} from "./agency";
import {Maintenance} from "./maintenance";
import {Trim} from "./trim";
import {Model} from "./model";
import {ConstructorName} from "./constructorName";

export class Car{
  public id:number;
  public constructorName:ConstructorName;
  public color:string;
  public year:string;
  public category:string;
  public trim:Trim;
  public model:Model;
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
