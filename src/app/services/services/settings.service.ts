import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL_DEV} from "../../app.const";
import {Settings} from "../models/settings";


@Injectable({
  providedIn: 'root'
})


export class SettingsService {
  constructor(
    private httpClient: HttpClient,
  ) { }
  getAll(){
    return this.httpClient.get(`${API_URL_DEV}/settings`)
  }
  getById(id:number){
    return this.httpClient.get(`${API_URL_DEV}/settings/${id}`);
  }
  save(settings:Settings){
    return this.httpClient.post(`${API_URL_DEV}/settings`,settings);
  }
  update(settings:Settings,id:number){
    return this.httpClient.put(`${API_URL_DEV}/settings/${id}`,settings);
  }
  delete(id:number){
    return this.httpClient.delete(`${API_URL_DEV}/settings/${id}`);
  }
}
