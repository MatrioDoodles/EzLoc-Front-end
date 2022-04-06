import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL_DEV} from "../../app.const";
import {Car} from "../models/car";
import {Maintenance} from "../models/maintenance";


@Injectable({
  providedIn: 'root'
})

export class MaintenanceService {
  constructor(
    private httpClient: HttpClient,
  ) { }
  getAll(){
    return this.httpClient.get(`${API_URL_DEV}/cars`)
  }
  getById(id:number){
    return this.httpClient.get(`${API_URL_DEV}/cars/${id}`);
  }
  save(maintenance:Maintenance){
    return this.httpClient.post(`${API_URL_DEV}/cars`,maintenance);
  }
  update(maintenance:Maintenance,id:number){
    return this.httpClient.put(`${API_URL_DEV}/cars/${id}`,maintenance);
  }
  delete(id:number){
    return this.httpClient.delete(`${API_URL_DEV}/cars/${id}`);
  }
}
