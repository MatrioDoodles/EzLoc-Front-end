import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL_DEV} from "../../app.const";
import {User} from "../models/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(){
    return this.httpClient.get(`${API_URL_DEV}/users/all`);
  }
  getById(id:number){
    return this.httpClient.get(`${API_URL_DEV}/users/${id}`);
  }
  getByUsername(username:string){
    const params = new HttpParams().append('username', username);
    return this.httpClient.get(`${API_URL_DEV}/users`,{params});
  }
  save(user:User){
    return this.httpClient.post(`${API_URL_DEV}/users`,user);
  }
  update(user:User,id:number){
    return this.httpClient.put(`${API_URL_DEV}/users/${id}`,user);
  }
  delete(id:number){
    return this.httpClient.delete(`${API_URL_DEV}/users/${id}`);
  }
}
