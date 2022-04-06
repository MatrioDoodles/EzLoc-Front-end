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
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private enterprise:Enterprise;
  private settings:Settings;
  private User:User;
  public hideOld = true;
  public hideNew = true;
  public hideConfirmation = true;
  public imageSrc: string;
  public updateUser: boolean = true;
  public updateEnterpriseGeneral: boolean = true;
  public updateEnterpriseSpecial: boolean = true;
  public updateSettings: boolean = true;
  public passwordCheck : boolean = false;
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
  enterpriseFormGeneral = this.formBuilder.group({
    name: [{value:"",disabled:this.updateEnterpriseGeneral},Validators.required],
    description: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
    phone: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
    mail: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
    website: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
    landLineNumber: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
    fax: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
    adress: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
    logo: [{value:"",disabled:this.updateEnterpriseGeneral}, Validators.required],
  })
  enterpriseFormSpecial = this.formBuilder.group({
    bank: [{value:"",disabled:this.updateEnterpriseSpecial}, Validators.required],
    registryNumber: [{value:"",disabled:this.updateEnterpriseSpecial}, Validators.required],
    fiscalId: [{value:"",disabled:this.updateEnterpriseSpecial}, Validators.required],
    city: [{value:"",disabled:this.updateEnterpriseSpecial}, Validators.required],
    immatriculation: [{value:"",disabled:this.updateEnterpriseSpecial}, Validators.required],
  })
  settingsForm = this.formBuilder.group({
    tva: [{value:"",disabled:this.updateSettings}, Validators.required],
    tvaValue: [{value:"",disabled:this.updateSettings}, Validators.required],
    currency: [{value:"",disabled:this.updateSettings}, Validators.required],
    acronym: [{value:"",disabled:this.updateSettings}, Validators.required],
    clientPrefix: [{value:"",disabled:this.updateSettings}, Validators.required],
    carPrefix: [{value:"",disabled:this.updateSettings}, Validators.required],
    reservationPrefix: [{value:"",disabled:this.updateSettings}, Validators.required],
    invoicePrefix: [{value:"",disabled:this.updateSettings}, Validators.required],
    contractPrefix: [{value:"",disabled:this.updateSettings}, Validators.required],
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
  //Generate Enterprise general Payload
  private generateEnterpriseGeneralPayload()
  {
    this.enterprise.name = this.enterpriseFormGeneral.controls['name'].value ;
    this.enterprise.description = this.enterpriseFormGeneral.controls['description'].value ;
    this.enterprise.phone = this.enterpriseFormGeneral.controls['phone'].value ;
    this.enterprise.mail = this.enterpriseFormGeneral.controls['mail'].value ;
    this.enterprise.landLineNumber = this.enterpriseFormGeneral.controls['landLineNumber'].value ;
    this.enterprise.website = this.enterpriseFormGeneral.controls['website'].value ;
    this.enterprise.fax = this.enterpriseFormGeneral.controls['fax'].value ;
    this.enterprise.adress = this.enterpriseFormGeneral.controls['adress'].value ;
    this.enterprise.logo = this.enterpriseFormGeneral.controls['logo'].value.substring(23);
  }
  //Generate Enterprise Special Payload
  private generateEnterpriseSpecialPayload()
  {
    this.enterprise.bank = this.enterpriseFormSpecial.controls['bank'].value ;
    this.enterprise.registryNumber = this.enterpriseFormSpecial.controls['registryNumber'].value ;
    this.enterprise.fiscalId = this.enterpriseFormSpecial.controls['fiscalId'].value ;
    this.enterprise.city = this.enterpriseFormSpecial.controls['city'].value ;
    this.enterprise.immatriculation = this.enterpriseFormSpecial.controls['immatriculation'].value ;
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
      this.enterpriseFormGeneral.controls['logo'].setValue("");
    }
    else
    {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [logo] = event.target.files;
        reader.readAsDataURL(logo);

        reader.onload = () => {

          this.imageSrc = reader.result as string;

          this.enterpriseFormGeneral.patchValue({
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
      result => {
        this.getInfos();
        this.disableSettingsUpdate();
        this.messageService.add({severity:'success', summary:'Paramètres Enregistré', detail:"les paramètres ont été enregistré avec succès"});
      },
      (error:HttpErrorResponse) => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});
      }
    )
  }
  //update Enterprise General
  public saveEnterpriseGeneral()
  {
    this.generateEnterpriseGeneralPayload();
    this.enterpriseService.update(this.enterprise,this.enterprise.id).subscribe(
      result => {
        this.getInfos();
        this.disableEnterpriseGeneralUpdate();
        this.messageService.add({severity:'success', summary:'Infos entreprise Enregistré', detail:"les informations ont été enregistré avec succès"});
      },
      (error:HttpErrorResponse) => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});
      }
    )

  }
  //update Enterprise Special
  public saveEnterpriseSpecial()
  {
    this.generateEnterpriseSpecialPayload();
    this.enterpriseService.update(this.enterprise,this.enterprise.id).subscribe(
      result => {
        this.getInfos();
        this.disableEnterpriseSpecialUpdate();
        this.messageService.add({severity:'success', summary:'Infos entreprise Enregistré', detail:"les informations ont été enregistré avec succès"});
      },
      (error:HttpErrorResponse) => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});

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
    this.enterpriseFormGeneral.controls['name'].setValue(this.enterprise.name) ;
    this.enterpriseFormGeneral.controls['description'].setValue(this.enterprise.description) ;
    this.enterpriseFormGeneral.controls['phone'].setValue(this.enterprise.phone) ;
    this.enterpriseFormGeneral.controls['mail'].setValue(this.enterprise.mail) ;
    this.enterpriseFormGeneral.controls['landLineNumber'].setValue(this.enterprise.landLineNumber) ;
    this.enterpriseFormGeneral.controls['website'].setValue(this.enterprise.website) ;
    this.enterpriseFormGeneral.controls['fax'].setValue(this.enterprise.fax) ;
    this.enterpriseFormGeneral.controls['adress'].setValue(this.enterprise.adress) ;
    this.enterpriseFormGeneral.controls['logo'].setValue(this.enterprise.logo);
    this.enterpriseFormSpecial.controls['city'].setValue(this.enterprise.city) ;
    this.enterpriseFormSpecial.controls['bank'].setValue(this.enterprise.bank) ;
    this.enterpriseFormSpecial.controls['registryNumber'].setValue(this.enterprise.registryNumber) ;
    this.enterpriseFormSpecial.controls['fiscalId'].setValue(this.enterprise.fiscalId) ;
    this.enterpriseFormSpecial.controls['immatriculation'].setValue(this.enterprise.immatriculation) ;
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
  //Enable field to update Enterprise general infos
  public enableEnterpriseGeneralUpdate()
  {
    this.updateEnterpriseGeneral =false;
    this.enterpriseFormGeneral.get('name')?.enable();
    this.enterpriseFormGeneral.get('mail')?.enable();
    this.enterpriseFormGeneral.get('description')?.enable();
    this.enterpriseFormGeneral.get('phone')?.enable();
    this.enterpriseFormGeneral.get('adress')?.enable();
    this.enterpriseFormGeneral.get('fax')?.enable();
    this.enterpriseFormGeneral.get('landLineNumber')?.enable();
    this.enterpriseFormGeneral.get('website')?.enable();
    this.enterpriseFormGeneral.get('logo')?.enable();
  }
  //disable field after update Enterprise general infos
  private disableEnterpriseGeneralUpdate()
  {
    this.updateEnterpriseGeneral = true;
    this.enterpriseFormGeneral.get('name')?.disable();
    this.enterpriseFormGeneral.get('mail')?.disable();
    this.enterpriseFormGeneral.get('description')?.disable();
    this.enterpriseFormGeneral.get('phone')?.disable();
    this.enterpriseFormGeneral.get('adress')?.disable();
    this.enterpriseFormGeneral.get('fax')?.disable();
    this.enterpriseFormGeneral.get('landLineNumber')?.disable();
    this.enterpriseFormGeneral.get('website')?.disable();
    this.enterpriseFormGeneral.get('logo')?.disable();
  }
  //Enable field to update Enterprise special infos
  public enableEnterpriseSpecialUpdate()
  {
    this.updateEnterpriseSpecial = false;
    this.enterpriseFormSpecial.get('bank')?.enable();
    this.enterpriseFormSpecial.get('city')?.enable();
    this.enterpriseFormSpecial.get('fiscalId')?.enable();
    this.enterpriseFormSpecial.get('immatriculation')?.enable();
    this.enterpriseFormSpecial.get('registryNumber')?.enable();
  }
  //disable field after update Enterprise special infos
  private disableEnterpriseSpecialUpdate()
  {
    this.updateEnterpriseSpecial = true;
    this.enterpriseFormSpecial.get('bank')?.disable();
    this.enterpriseFormSpecial.get('city')?.disable();
    this.enterpriseFormSpecial.get('fiscalId')?.disable();
    this.enterpriseFormSpecial.get('immatriculation')?.disable();
    this.enterpriseFormSpecial.get('registryNumber')?.disable();
  }
  //Enable field to update Settings infos
  public enableSettingsUpdate()
  {
    this.updateSettings = false;
    this.settingsForm.get('tva')?.enable();
    this.settingsForm.get('tvaValue')?.enable();
    this.settingsForm.get('acronym')?.enable();
    this.settingsForm.get('currency')?.enable();
    this.settingsForm.get('clientPrefix')?.enable();
    this.settingsForm.get('contractPrefix')?.enable();
    this.settingsForm.get('invoicePrefix')?.enable();
    this.settingsForm.get('carPrefix')?.enable();
    this.settingsForm.get('reservationPrefix')?.enable();
  }
  //disable field after update Settings infos
  private disableSettingsUpdate()
  {
    this.updateSettings = true;
    this.settingsForm.get('tva')?.disable();
    this.settingsForm.get('tvaValue')?.disable();
    this.settingsForm.get('acronym')?.disable();
    this.settingsForm.get('currency')?.disable();
    this.settingsForm.get('clientPrefix')?.disable();
    this.settingsForm.get('contractPrefix')?.disable();
    this.settingsForm.get('invoicePrefix')?.disable();
    this.settingsForm.get('carPrefix')?.disable();
    this.settingsForm.get('reservationPrefix')?.disable();
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


    //this.oldPasswordCheck = false;
    bcrypt.compare(this.passwordControl.controls['oldPassword'].value,this.User.password ,
      (err, res) => {
      if(res) {
        this.oldPasswordCheck = false;
        if(this.passwordControl.controls['oldPassword'].value===this.passwordControl.controls['newPassword'].value) {
          this.newPasswordCheck = true;
        }
        else {
          this.newPasswordCheck = false;
          this.userService.updatePassword(this.passwordControl.controls['newPassword'].value,this.User.id).subscribe(
            data =>{
              this.getInfos();
              this.messageService.add({severity:'success', summary:'Mot de passe changé', detail:"le mot de passe a été changé avec succès"});
            }
          )
        }
      } else {
        this.oldPasswordCheck = true;
      }
    });
  }
}
