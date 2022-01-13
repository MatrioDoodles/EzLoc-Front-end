import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-first-time-setup',
  templateUrl: './first-time-setup.component.html',
  styleUrls: ['./first-time-setup.component.scss']
})
export class FirstTimeSetupComponent implements OnInit {
  imageSrc: string;
  cities:string[];
  constructor(
    private formBuilder: FormBuilder,) { }
  items: MenuItem[];
  enterpriseForm = this.formBuilder.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    phone: ["", Validators.required],
    bank: ["", Validators.required],
    mail: ["", Validators.required],
    website: ["", Validators.required],
    landLineNumber: ["", Validators.required],
    fax: ["", Validators.required],
    adress: ["", Validators.required],
    registryNumber: ["", Validators.required],
    fiscalId: ["", Validators.required],
    city: ["", Validators.required],
    immatriculation: ["", Validators.required],
    logo: ["", Validators.required],
  })
  settingsForm = this.formBuilder.group({
    tva: ["", Validators.required],
    tvaValue: ["", Validators.required],
    currency: ["", Validators.required],
    acronym: ["", Validators.required],
    clientPrefix: ["", Validators.required],
    carPrefix: ["", Validators.required],
    reservationPrefix: ["", Validators.required],
    invoicePrefix: ["", Validators.required],
    contractPrefix: ["", Validators.required],
  })


  ngOnInit(): void {
    this.cities = []
    this.items = [
      {label: 'Premier Paramétrage'},
      {label: 'Confirmation'}
    ];
  }
  imgSelected(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [logo] = event.target.files;
      reader.readAsDataURL(logo);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.enterpriseForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

}
