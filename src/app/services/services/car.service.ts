import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL_DEV} from "../../app.const";
import {Car} from "../models/car";


@Injectable({
  providedIn: 'root'
})

export class CarService{
  constructor(
    private httpClient: HttpClient,
  ) { }
  getAll(){
    return this.httpClient.get(`${API_URL_DEV}/cars`)
  }
  getById(id:number){
    return this.httpClient.get(`${API_URL_DEV}/cars/${id}`);
  }
  save(car:Car){
    return this.httpClient.post(`${API_URL_DEV}/cars`,car);
  }
  update(car:Car,id:number){
    return this.httpClient.put(`${API_URL_DEV}/cars/${id}`,car);
  }
  delete(id:number){
    return this.httpClient.delete(`${API_URL_DEV}/cars/${id}`);
  }
  allReservation(id:number){
    return this.httpClient.get(`${API_URL_DEV}/cars/${id}/reservations`);
  }
  getConstructors() {
    return this.httpClient.get(`${API_URL_DEV}/cars/constructors`)
  }
  getModelsByConstructor(id:number) {
    return this.httpClient.get(`${API_URL_DEV}/cars/models/${id}`)
  }
  getTrimsByConstructor(id:number) {
    return this.httpClient.get(`${API_URL_DEV}/cars/trims/${id}`)
  }
}
