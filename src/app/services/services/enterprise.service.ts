import {Injectable} from "@angular/core";
import { API_URL_DEV } from 'src/app/app.const';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EnterpriseService {
  constructor(
    private httpClient: HttpClient,
  ) { }
  getAll(){
    return this.httpClient.get(`${API_URL_DEV}/enterprises`)
  }
  getById(id:number){
    return this.httpClient.get(`${API_URL_DEV}/enterprises/${id}`);
  }
  save(enterprise:Enterprise){
    return this.httpClient.post(`${API_URL_DEV}/enterprises`,enterprise);
  }
  update(enterprise:Enterprise,id:number){
    return this.httpClient.put(`${API_URL_DEV}/enterprises/${id}`,enterprise);
  }
  delete(id:number){
    return this.httpClient.delete(`${API_URL_DEV}/enterprises/${id}`);
  }


}