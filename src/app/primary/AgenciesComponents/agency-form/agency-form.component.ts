import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {Agency} from "../../../services/models/agency";
import {Observable} from "rxjs";
import {AgencyService} from "../../../services/services/agency.service";

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss']
})
export class AgencyFormComponent implements OnInit {

  agency: Agency;
  btnname: string;
  showLoader:boolean = true;
  filteredOptions: Observable<string[]>;
  agencyControl = this.formBuilder.group({
    name: ["", Validators.required],
    phone: ["", Validators.required],
    adress: ["", Validators.required],
    fax: ["", Validators.required],
    landLineNumber: ["", Validators.required],
    description: ["", Validators.required],
    primaire: ["", Validators.required],
  });
  constructor(private route: ActivatedRoute,
              private agencyService: AgencyService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,) {
  }

  ngOnInit(): void {

    this.agency = new Agency();


    if (this.route.snapshot.params['id'] === null || this.route.snapshot.params['id'] === undefined) {
      this.showLoader = false;
      this.btnname = "Ajouter"
    }

    else {
      this.agencyService.getById(Number(this.route.snapshot.params['id'])).
      subscribe(
        (data: any) => {
          this.setFields(data);
          this.showLoader = false;
        }
      )
      this.btnname = "Modifier"
    }

  }
  submit() {
    this.showLoader = true;
    this.generatePayload();

    if (this.route.snapshot.params['id'] === null || this.route.snapshot.params['id'] === undefined) {

      this.agencyService.save(this.agency).subscribe(
        (resp:any) => {
          this.messageService.add({severity:'success', summary:'Agence Ajouté', detail:"L'agence a été ajouté avec succès"});
          setTimeout(() =>{
            this.router.navigate(['ezlocprimary/primary-module/agencies']);
            this.showLoader = false;
          },1500);

        },
        (error:any)=>{
          this.messageService.add({severity:'error', summary:'Erreur', detail:"Une erreur est survenu"});
          this.showLoader = false;
        }
      );

    }
    else {
      this.agencyService.update(this.agency,Number(this.route.snapshot.params['id'])).subscribe(
        (resp:any) => {
          this.messageService.add({severity:'success', summary:'Agence Enregistré', detail:"L'agence a été enregistré avec succès"});
          setTimeout(() =>{
            this.router.navigate(['ezlocprimary/primary-module/agencies']);
            this.showLoader = false;
          },1500);

        },
        (error:HttpErrorResponse)=>{
            this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});
            this.showLoader = false;
        }
      )

    }

  }
  setFields(agency:Agency){
    this.agencyControl.controls['fax'].setValue(agency.fax);
    this.agencyControl.controls['landLineNumber'].setValue(agency.landLineNumber);
    this.agencyControl.controls['primaire'].setValue(agency.primaire);
    this.agencyControl.controls['name'].setValue(agency.name);
    this.agencyControl.controls['description'].setValue(agency.description);
    this.agencyControl.controls['phone'].setValue(agency.phone);
    this.agencyControl.controls['adress'].setValue(agency.adress);
  }
  generatePayload(){
    this.agency.fax            = this.agencyControl.controls['fax'].value;
    this.agency.landLineNumber = this.agencyControl.controls['landLineNumber'].value;
    this.agency.primaire           = this.agencyControl.controls['primaire'].value;
    this.agency.name           = this.agencyControl.controls['name'].value;
    this.agency.description        = this.agencyControl.controls['description'].value;
    this.agency.phone          = this.agencyControl.controls['phone'].value;
    this.agency.adress         = this.agencyControl.controls['adress'].value;
  }
}
