import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  errorMsg='Invalid Credentials'
  invalidLogin=false
  showloader=false
  hide = true;
  form = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
  });
  ngOnInit(): void {

  }
handleLogin(){}
}
