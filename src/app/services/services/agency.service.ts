import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL_DEV} from "../../app.const";
import {Agency} from "../models/agency";


@Injectable({
  providedIn: 'root'
})

export class AgencyService {
  constructor(
    private httpClient: HttpClient,
  ) { }
  getAll(){
    return this.httpClient.get(`${API_URL_DEV}/agencies`)
  }
  getById(id:number){
    return this.httpClient.get(`${API_URL_DEV}/agencies/${id}`);
  }
  save(agency:Agency){
    return this.httpClient.post(`${API_URL_DEV}/agencies`,agency);
  }
  update(agency:Agency,id:number){
    return this.httpClient.put(`${API_URL_DEV}/agencies/${id}`,agency);
  }
  delete(id:number){
    return this.httpClient.delete(`${API_URL_DEV}/agencies/${id}`);
  }
}
