import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, Validators} from "@angular/forms";
import {Enterprise} from "../services/models/enterprise";
import {Settings} from "../services/models/settings";
import {Router} from "@angular/router";
import {SettingsService} from "../services/services/settings.service";
import {EnterpriseService} from "../services/services/enterprise.service";
import {User} from "../services/models/user";
import {UserService} from "../services/services/user.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";


@Component({
  selector: 'app-first-time-setup',
  templateUrl: './first-time-setup.component.html',
  styleUrls: ['./first-time-setup.component.scss'],
  providers: [MessageService]
})
export class FirstTimeSetupComponent implements OnInit {
  enterprise:Enterprise;
  settings:Settings;
  user:User;
  imageSrc: string;
  villes: string[] =  [
    'AGADIR', 'BENI MELLAL', 'BERKANE', 'CASABLANCA', 'ELJADIDA', 'FES', 'INEZGANE', 'KENITRA', 'KHEMISSET', 'KHENIFRA',
    'SETTAT', 'KHOURIBGA', 'LAAYOUNE', 'MARRAKECH', 'MEKNES', 'MOHAMMADIA', 'NADOR', 'OUJDA', 'RABAT', 'SAFI', 'SALE',
    'SIDI KACEM', 'TANGER', 'TAZA', 'TEMARA', 'TETOUAN', 'AL HOCEIMA', 'BERRECHID', 'ERRACHIDIA', 'ESSAOUIRA', 'OUARZAZATE',
    'OUEZZANE', 'SEFROU', 'TIFLET', 'TAROUDANT', 'CHAOUEN', 'MIDELT', 'SIDI SLIMANE', 'MIDELT'
  ];
  filteredOptions: Observable<string[]>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private settingsService:SettingsService,
    private enterpriseService:EnterpriseService,
    private messageService: MessageService,
    private userService: UserService,) { }
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
    this.filteredOptions = this.enterpriseForm.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.villes.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  //Image preview
  imgSelected(event:any){

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
  //Generate Enterprise Payload
  generateEnterprisePayload(){
    this.enterprise=new Enterprise();
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
  generateSettingsPayload(){
    this.settings = new Settings();
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

  submit(){
    this.user = new User();
    this.enterpriseService.save(this.enterprise).subscribe(
     (response:any) => {
        setTimeout(()=>{
          this.settings.enterprise = response;
          this.user.enterprise = response;
          this.user.id = Number(sessionStorage.getItem('id'));
          this.userService.update(this.user,this.user.id).subscribe(
            (response:any) => {
              this.messageService.add({severity:'success', summary:'Entreprise Enregistré', detail:"L'enterprise a été enregistré avec succès"});}
          )
          this.settingsService.save(this.settings).subscribe(
            (response:any) => {
              this.messageService.add({severity:'success', summary:'Configuration Validé', detail:'La configuration a été términé avec succès'});
              setTimeout(()=>{

                this.router.navigate(['ezlocprimary/primary-module/welcome'])
              },2000)
            }
          )
        },2000)
    }
    )
  }
}
