import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import { API_URL_DEV } from 'src/app/app.const';
import { map } from 'rxjs/operators';
import {Subject} from "rxjs";


export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _role = new Subject<boolean>();
  role$= this._role.asObservable();
  @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();
  constructor(
    private httpClient: HttpClient,
   //private userService:UserService
              ) { }

  isUserLogged(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  //JWTAuth
  Login(username: string, password: string){

    return this.httpClient
   .post<any>(`${API_URL_DEV}/authenticate`,{
    username,
    password
   }).
          pipe(
                map(
                  data =>{
                    sessionStorage.setItem(AUTHENTICATED_USER,username);
                    sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
                    this.getLoggedIn.emit(true);
                    /*this.userService.getUserByUsername(username).subscribe(
                      response => {
                        sessionStorage.setItem('role',response.role.label);

                      }
                    )*/
                    return data;
                  }
                )
   );
  }
  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  // @ts-ignore
  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
    return sessionStorage.getItem(TOKEN);
  }

  Logout()
  {
    this.getLoggedIn.emit(false);
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}
