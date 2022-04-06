import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {MaintenanceService} from "../../../services/services/maintenance.service";
import {CarService} from "../../../services/services/car.service";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private maintenanceService: MaintenanceService,
    private carService: CarService,) { }

  carForm = this.formBuilder.group({
    constructorName: ["", Validators.required],
    model: ["", Validators.required],
    color: ["", Validators.required],
    year: ["", Validators.required],
    category: ["", Validators.required],
    trim: ["", Validators.required],
    fuel: ["", Validators.required],
    mileage: ["", Validators.required],
    gearbox: ["", Validators.required],
    registration: ["", Validators.required],
    fiscalPower: ["", Validators.required],
    assurance: ["", Validators.required],
    assuranceEndDate: ["", Validators.required],
    lastMileage: ["", Validators.required],
    technicalVisit: ["", Validators.required],
    vignette: ["", Validators.required],
    vignettePaid: ["", Validators.required],
    assurancePaid: ["", Validators.required],
    technicalVisitDone: ["", Validators.required],
  })
  ngOnInit(): void {
  }

}
