import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {MaintenanceService} from "../../../services/services/maintenance.service";
import {CarService} from "../../../services/services/car.service";
import {Car} from "../../../services/models/car";
import {ConstructorName} from "../../../services/models/constructorName";
import {Trim} from "../../../services/models/trim";
import {Model} from "../../../services/models/model";
import { Maintenance } from 'src/app/services/models/maintenance';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

  public car:Car;
  public constructors:ConstructorName[];
  public trims:Trim[];
  public models:Model[];
  public btnname: string;
  public fuels:string[]=["Diesel","Essence","Hybride","Electrique"];
  public gearbox:string[]=["Manuel","Automatique"];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private maintenanceService: MaintenanceService,
    private carService: CarService,) { }

  carForm = this.formBuilder.group({
    color: ["", Validators.required],
    year: ["", Validators.required],
    category: ["", Validators.required],
    mileage: ["", Validators.required],
    registration: ["", Validators.required],
    fiscalPower: ["", Validators.required],
    assuranceEndDate: ["", Validators.required],
    lastMileage: ["", Validators.required],
    technicalVisit: ["", Validators.required],
    assurance: ["", Validators.required],
    vignette: ["", Validators.required],
    vignettePaid: ["", Validators.required],
    assurancePaid: ["", Validators.required],
    technicalVisitDone: ["", Validators.required],
  })

  ngOnInit(): void {
    this.car = new Car();
    this.car.maintenance = new Maintenance();
      this.carService.getConstructors().subscribe(
        (resp:any) => {
          setTimeout(() =>{
            this.constructors = resp;
          })
        }
      )
    this.btnname ="Ajouter"
  }

  getDetails(){
    this.carService.getModelsByConstructor(this.car.constructorName.id).subscribe(
      (resp:any)=>{
        this.models = resp;
      }
    );
    this.carService.getTrimsByConstructor(this.car.constructorName.id).subscribe(
      (resp:any)=>{
        this.trims = resp;
      }
    );
  }

  submit(){
    this.generatePayload();
    console.log(this.car);

  }

  generatePayload(){
    this.car.color = this.carForm.controls['color'].value;
    this.car.year = this.carForm.controls['year'].value;
    this.car.category = this.carForm.controls['category'].value;
    this.car.mileage = this.carForm.controls['mileage'].value;
    this.car.registration = this.carForm.controls['registration'].value;
    this.car.fiscalPower = this.carForm.controls['fiscalPower'].value;
   // this.car.maintenance.assurance = this.carForm.controls['assurance'].value;
    this.car.maintenance.assuranceEndDate = this.carForm.controls['assuranceEndDate'].value;
    this.car.maintenance.assurancePaid = this.carForm.controls['assurancePaid'].value;
    this.car.maintenance.lastMileage = this.carForm.controls['lastMileage'].value;
    this.car.maintenance.technicalVisitDone = this.carForm.controls['technicalVisitDone'].value;
    this.car.maintenance.technicalVisit = this.carForm.controls['technicalVisit'].value;
    this.car.maintenance.vignette = this.carForm.controls['vignette'].value;
    this.car.maintenance.vignettePaid = this.carForm.controls['vignettePaid'].value;
  }

}
