import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class MiscService{
  constructor(
    private httpClient: HttpClient,
  ) { }

  getLink(link:string){
    return this.httpClient.get(`${link}`)
  }
}
