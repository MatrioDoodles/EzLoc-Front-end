import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/auth-services/authentication.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private Auth: AuthenticationService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,) {
    sessionStorage.clear();
    localStorage.clear();
  }

  showLoader = false
  hide = true;
  loginForm = this.formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  ngOnInit(): void {
  }

  handleLogin() {

    this.showLoader = true;
    this.Auth.Login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(
      (response: any) => {
        setTimeout(() => {
          if (response) {
            this.showLoader = false;
          }
          this.router.navigate(['ezlocprimary/primary-module/welcome'])
         /* if (sessionStorage.getItem('role') === 'ADMINISTRATEUR')
            this.router.navigate(['ezlocprimary/primary-module/welcome'])
          else
            this.router.navigate(['ezlocprimary/primary-module/listOrders'])*/
        }, 2000)

      },
      (error: any) => {
        console.log(error)
        this.showLoader = false;
        this.messageService.add({severity:'error', summary:'Connexion échoué ', detail:'Login ou Mot de passe érroné',sticky: true});
      }
    )

  }
}



