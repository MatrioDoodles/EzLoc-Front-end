import { Component, OnInit } from '@angular/core';
import {Enterprise} from "../../../services/models/enterprise";
import {Settings} from "../../../services/models/settings";
import {User} from "../../../services/models/user";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SettingsService} from "../../../services/services/settings.service";
import {EnterpriseService} from "../../../services/services/enterprise.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import * as bcrypt from 'bcrypt';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private enterprise:Enterprise;
  private settings:Settings;
  private User:User;
  public imageSrc: string;
  public updateUser: boolean = true;
  public passwordCheck : boolean;
  public filteredOptions: Observable<string[]>;
  public oldPasswordCheck: boolean;
  public newPasswordCheck: boolean;
  public villes: string[] =  [
    'AGADIR', 'BENI MELLAL', 'BERKANE', 'CASABLANCA', 'ELJADIDA', 'FES', 'INEZGANE', 'KENITRA', 'KHEMISSET', 'KHENIFRA',
    'SETTAT', 'KHOURIBGA', 'LAAYOUNE', 'MARRAKECH', 'MEKNES', 'MOHAMMADIA', 'NADOR', 'OUJDA', 'RABAT', 'SAFI', 'SALE',
    'SIDI KACEM', 'TANGER', 'TAZA', 'TEMARA', 'TETOUAN', 'AL HOCEIMA', 'BERRECHID', 'ERRACHIDIA', 'ESSAOUIRA', 'OUARZAZATE',
    'OUEZZANE', 'SEFROU', 'TIFLET', 'TAROUDANT', 'CHAOUEN', 'MIDELT', 'SIDI SLIMANE', 'MIDELT'
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private settingsService:SettingsService,
    private enterpriseService:EnterpriseService,
    private messageService: MessageService,
    private userService: UserService,) { }
  enterpriseForm = this.formBuilder.group({
    name: ["",Validators.required],
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
  userControl = this.formBuilder.group({
    name: [{value:"",disabled:this.updateUser}, Validators.required],
    surname: [{value:"",disabled:this.updateUser}, Validators.required],
    adress: [{value:"",disabled:this.updateUser}, Validators.required],
    phone: [{value:"",disabled:this.updateUser}, Validators.required],
    mail: [{value:"",disabled:this.updateUser}, Validators.required],
    city: [{value:"",disabled:this.updateUser}, Validators.required],
  });
  passwordControl= this.formBuilder.group({
   oldPassword: ["", Validators.required],
   newPassword: ["", Validators.required],
   newPasswordConfirmation: ["", Validators.required],
  })



  ngOnInit(): void
  {
    this.oldPasswordCheck = false;
    this.newPasswordCheck = false;
    this.passwordCheck = false;
    this.filteredOptions = this.userControl.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value))
    );
    this.settings = new Settings();
    this.enterprise=new Enterprise();
    this.getInfos();
  }
  private getInfos()
  {
    this.userService.getById(Number(sessionStorage.getItem('id'))).subscribe(
      (result:any) => {
        this.User = result;
        this.setUserFields();
        this.enterpriseService.getById(result.enterprise.id).subscribe(
          (result:any) => {
            this.enterprise = result;
            this.setEnterpriseFields();
            this.settingsService.getById(result.settings.id).subscribe(
              (result:any) => {
                this.settings = result;
                setTimeout(()=> {this.setSettingsFields();},1500)
              }
            )
          }
        )



      }
    )
  }
  private _filter(value: string): string[]
  {
    const filterValue = value.toLowerCase();

    return this.villes.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private generateEnterprisePayload()
  {
    this.enterprise.name = this.enterpriseForm.controls['name'].value ;
    this.enterprise.description = this.enterpriseForm.controls['description'].value ;
    this.enterprise.phone = this.enterpriseForm.controls['phone'].value ;
    this.enterprise.bank = this.enterpriseForm.controls['bank'].value ;
    this.enterprise.mail = this.enterpriseForm.controls['mail'].value ;
    this.enterprise.landLineNumber = this.enterpriseForm.controls['landLineNumber'].value ;
    this.enterprise.website = this.enterpriseForm.controls['website'].value ;
    this.enterprise.fax = this.enterpriseForm.controls['fax'].value ;
    this.enterprise.adress = this.enterpriseForm.controls['adress'].value ;
    this.enterprise.registryNumber = this.enterpriseForm.controls['registryNumber'].value ;
    this.enterprise.fiscalId = this.enterpriseForm.controls['fiscalId'].value ;
    this.enterprise.city = this.enterpriseForm.controls['city'].value ;
    this.enterprise.immatriculation = this.enterpriseForm.controls['immatriculation'].value ;
    this.enterprise.logo = this.enterpriseForm.controls['logo'].value.substring(23);
  }
  //Generate Settings Payload
  private generateSettingsPayload()
  {
    this.settings.tva = this.settingsForm.controls['tva'].value ;
    this.settings.tvaValue = this.settingsForm.controls['tvaValue'].value ;
    this.settings.acronym = this.settingsForm.controls['acronym'].value ;
    this.settings.currency = this.settingsForm.controls['currency'].value ;
    this.settings.clientPrefix = this.settingsForm.controls['clientPrefix'].value ;
    this.settings.contractPrefix = this.settingsForm.controls['contractPrefix'].value ;
    this.settings.invoicePrefix = this.settingsForm.controls['invoicePrefix'].value ;
    this.settings.reservationPrefix = this.settingsForm.controls['reservationPrefix'].value ;
    this.settings.carPrefix = this.settingsForm.controls['carPrefix'].value ;
  }
  //Generate User Payload
  private generateUserPayload()
  {
    this.User.mail     = this.userControl.controls['mail'].value;
    this.User.name     = this.userControl.controls['name'].value;
    this.User.surname  = this.userControl.controls['surname'].value;
    this.User.phone    = this.userControl.controls['phone'].value;
    this.User.adress   = this.userControl.controls['adress'].value;
    this.User.city     = this.userControl.controls['city'].value;
  }

  //Preview Uploaded Img
  public imgSelected(event:any)
  {

    if(event.target.files[0].size >2097152) {
      alert("veuillez ne pas depasser 2 mo de taille");
      this.enterpriseForm.controls['logo'].setValue("");
    }
    else
    {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [logo] = event.target.files;
        reader.readAsDataURL(logo);

        reader.onload = () => {

          this.imageSrc = reader.result as string;

          this.enterpriseForm.patchValue({
            logo: reader.result
          });

        };

      }
    }
  }
  //Update settings
  public saveSettings()
  {
    this.generateSettingsPayload();
    this.settingsService.update(this.settings,this.settings.id).subscribe(
      result => {},
      (error:HttpErrorResponse) => {
        if(error.status === 200){
          this.messageService.add({severity:'success', summary:'Paramètres Enregistré', detail:"les paramètres ont été enregistré avec succès"});
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});
        }
      }
    )
  }
  //update Enterprise
  public saveEnterprise()
  {
    this.generateEnterprisePayload();
    this.enterpriseService.update(this.enterprise,this.enterprise.id).subscribe(
      result => {},
      (error:HttpErrorResponse) => {
        if(error.status === 200){
          this.messageService.add({severity:'success', summary:'Infos entreprise Enregistré', detail:"les informations ont été enregistré avec succès"});
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});
        }
      }
    )

  }
  //Update connected user
  public saveUser()
  {
    this.generateUserPayload();
    this.userService.update(this.User,this.User.id).subscribe(
      result => {
        this.getInfos();
        this.disableUserUpdate();
        this.messageService.add({severity:'success', summary:'Infos compte Enregistré', detail:"les informations ont été enregistré avec succès"});
      },
      (error:HttpErrorResponse) => {

          this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});
        }

    )

  }
  //Set enterprise form in the HTML with the retrieved infos
  private setEnterpriseFields()
  {
    this.enterpriseForm.controls['name'].setValue(this.enterprise.name) ;
    this.enterpriseForm.controls['description'].setValue(this.enterprise.description) ;
    this.enterpriseForm.controls['phone'].setValue(this.enterprise.phone) ;
    this.enterpriseForm.controls['bank'].setValue(this.enterprise.bank) ;
    this.enterpriseForm.controls['mail'].setValue(this.enterprise.mail) ;
    this.enterpriseForm.controls['landLineNumber'].setValue(this.enterprise.landLineNumber) ;
    this.enterpriseForm.controls['website'].setValue(this.enterprise.website) ;
    this.enterpriseForm.controls['fax'].setValue(this.enterprise.fax) ;
    this.enterpriseForm.controls['adress'].setValue(this.enterprise.adress) ;
    this.enterpriseForm.controls['registryNumber'].setValue(this.enterprise.registryNumber) ;
    this.enterpriseForm.controls['fiscalId'].setValue(this.enterprise.fiscalId) ;
    this.enterpriseForm.controls['city'].setValue(this.enterprise.city) ;
    this.enterpriseForm.controls['immatriculation'].setValue(this.enterprise.immatriculation) ;
    this.enterpriseForm.controls['logo'].setValue(this.enterprise.logo);
  }
  //Set settings form in the HTML with the retrieved infos
  private setSettingsFields()
  {
    this.settingsForm.controls['tva'].setValue(this.settings.tva) ;
    this.settingsForm.controls['tvaValue'].setValue(this.settings.tvaValue) ;
    this.settingsForm.controls['acronym'].setValue(this.settings.acronym) ;
    this.settingsForm.controls['currency'].setValue(this.settings.currency) ;
    this.settingsForm.controls['clientPrefix'].setValue(this.settings.clientPrefix) ;
    this.settingsForm.controls['contractPrefix'].setValue(this.settings.contractPrefix) ;
    this.settingsForm.controls['invoicePrefix'].setValue(this.settings.invoicePrefix) ;
    this.settingsForm.controls['reservationPrefix'].setValue(this.settings.reservationPrefix) ;
    this.settingsForm.controls['carPrefix'].setValue(this.settings.carPrefix) ;
  }
  //Set user form in the HTML with the retrieved infos
  private setUserFields()
  {
    this.userControl.controls['mail'].setValue(this.User.mail);
    this.userControl.controls['name'].setValue(this.User.name);
    this.userControl.controls['surname'].setValue(this.User.surname);
    this.userControl.controls['phone'].setValue(this.User.phone);
    this.userControl.controls['adress'].setValue(this.User.adress);
    this.userControl.controls['city'].setValue(this.User.city);
  }
  //Enable field to update user infos
  public enableUserUpdate()
  {
    this.updateUser =false;
    this.userControl.get('name')?.enable();
    this.userControl.get('mail')?.enable();
    this.userControl.get('surname')?.enable();
    this.userControl.get('phone')?.enable();
    this.userControl.get('adress')?.enable();
    this.userControl.get('city')?.enable();
  }
  //disable field after update user infos
  private disableUserUpdate()
  {
    this.updateUser = true;
    this.userControl.get('name')?.disable();
    this.userControl.get('mail')?.disable();
    this.userControl.get('surname')?.disable();
    this.userControl.get('phone')?.disable();
    this.userControl.get('adress')?.disable();
    this.userControl.get('city')?.disable();
  }
  //checking the new password and confirmation
  public checkingPasswordFields(){
    if(this.passwordControl.controls['newPassword'].value === this.passwordControl.controls['newPasswordConfirmation'].value)
    {
      this.passwordCheck = true;
    }
    else {
      this.passwordCheck = false;
    }
  }
  //Change Password
  public passwordChange()
  {

  if(this.passwordControl.controls['oldPassword'].value===this.User.password)
  {
    this.passwordControl.controls['newPassword'].value;
  }
  else{
      this.oldPasswordCheck = true
  }
  }
}
