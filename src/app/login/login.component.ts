import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  username:any;
  password:any;
  errorMsg='Invalid Credentials'
  invalidLogin=false
  showloader=false
  hide = true;
  ngOnInit(): void {
  }
handleLogin(){}
}
