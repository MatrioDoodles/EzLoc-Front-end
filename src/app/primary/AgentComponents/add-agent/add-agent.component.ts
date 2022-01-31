import { Component, OnInit } from '@angular/core';
import {User} from "../../../services/models/user";
import {map, startWith} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../../services/services/user.service";
import {Role} from "../../../services/models/role";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss'],
  providers :[MessageService]
})
export class AddAgentComponent implements OnInit {

  User: User
  btnname: string;
  showLoader:boolean = true;
  villes: string[] =  [
    'AGADIR', 'BENI MELLAL', 'BERKANE', 'CASABLANCA', 'ELJADIDA', 'FES', 'INEZGANE', 'KENITRA', 'KHEMISSET', 'KHENIFRA',
    'SETTAT', 'KHOURIBGA', 'LAAYOUNE', 'MARRAKECH', 'MEKNES', 'MOHAMMADIA', 'NADOR', 'OUJDA', 'RABAT', 'SAFI', 'SALE',
    'SIDI KACEM', 'TANGER', 'TAZA', 'TEMARA', 'TETOUAN', 'AL HOCEIMA', 'BERRECHID', 'ERRACHIDIA', 'ESSAOUIRA', 'OUARZAZATE',
    'OUEZZANE', 'SEFROU', 'TIFLET', 'TAROUDANT', 'CHAOUEN', 'MIDELT', 'SIDI SLIMANE', 'MIDELT'
  ];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  userControl = this.formBuilder.group({
    name: ["", Validators.required],
    surname: ["", Validators.required],
    adress: ["", Validators.required],
    phone: ["", Validators.required],
    mail: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", Validators.required],
    city: ["", Validators.required],
  });
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,) {
  }

  ngOnInit(): void {
    this.filteredOptions = this.userControl.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value))
    );
    this.User = new User();


    if (this.route.snapshot.params['id'] === null || this.route.snapshot.params['id'] === undefined) {
      this.showLoader = false;
      this.btnname = "Ajouter"
    }

    else {
      this.userControl.controls['password'].removeValidators(Validators.required);
      this.userService.getById(Number(this.route.snapshot.params['id'])).
      subscribe(
        (data: any) => {
          this.setFields(data);
          this.showLoader = false;
        }
      )
      this.btnname = "Modifier"
    }

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.villes.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  submit() {
    this.showLoader = true;
    this.generatePayload();

    if (this.route.snapshot.params['id'] === null || this.route.snapshot.params['id'] === undefined) {
      this.User.role = new Role();
      this.User.role.id = 3;

      this.userService.save(this.User).subscribe(
        (resp:any) => {
          this.messageService.add({severity:'success', summary:'Agent Ajouté', detail:"L'agent a été ajouté avec succès"});
          setTimeout(() =>{
            this.router.navigate(['ezlocprimary/primary-module/users']);
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
      this.userService.update(this.User,Number(this.route.snapshot.params['id'])).subscribe(
        (resp:any) => {},
      (error:HttpErrorResponse)=>{
          if(error.status === 404 || error.status === 500) {
            this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Une erreur est survenu"});
            this.showLoader = false;
          }
        else if(error.status === 200){
            this.messageService.add({severity:'success', summary:'Agent Enregistré', detail:"L'agent a été enregistré avec succès"});
            setTimeout(() =>{
              this.router.navigate(['ezlocprimary/primary-module/users']);
              this.showLoader = false;
            },1500);

          }
      }
      )

    }

  }
  setFields(user:User){
    this.userControl.controls['username'].setValue(user.username);
    this.userControl.controls['password'].setValue(user.password);
    this.userControl.controls['mail'].setValue(user.mail);
    this.userControl.controls['name'].setValue(user.name);
    this.userControl.controls['surname'].setValue(user.surname);
    this.userControl.controls['phone'].setValue(user.phone);
    this.userControl.controls['adress'].setValue(user.adress);
    this.userControl.controls['city'].setValue(user.city);
  }
  generatePayload(){
    this.User.username = this.userControl.controls['username'].value;
    this.User.password = this.userControl.controls['password'].value;
    this.User.mail     = this.userControl.controls['mail'].value;
    this.User.name     = this.userControl.controls['name'].value;
    this.User.surname  = this.userControl.controls['surname'].value;
    this.User.phone    = this.userControl.controls['phone'].value;
    this.User.adress   = this.userControl.controls['adress'].value;
    this.User.city     = this.userControl.controls['city'].value;
  }
}
