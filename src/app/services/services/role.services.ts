import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL_DEV} from "../../app.const";
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(
    private httpClient: HttpClient,
  ) { }
  getAll(){
    return this.httpClient.get(`${API_URL_DEV}/roles`)
  }
  getById(id:number){
    return this.httpClient.get(`${API_URL_DEV}/roles/${id}`);
  }
  save(role:Role){
    return this.httpClient.post(`${API_URL_DEV}/roles`,role);
  }
  update(role:Role,id:number){
    return this.httpClient.put(`${API_URL_DEV}/roles/${id}`,role);
  }
  delete(id:number){
    return this.httpClient.delete(`${API_URL_DEV}/roles/${id}`);
  }
}
