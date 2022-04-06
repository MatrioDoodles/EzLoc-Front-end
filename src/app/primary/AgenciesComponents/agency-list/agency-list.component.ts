import { Component, OnInit } from '@angular/core';
import {User} from "../../../services/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AgencyService} from "../../../services/services/agency.service";
import {Agency} from "../../../services/models/agency";

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent implements OnInit {

  agencies:Agency[]=[];
  loading: boolean = true;
  constructor(private agencyService:AgencyService,
              private route:Router,
              private router: ActivatedRoute,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    this.retrieveAllAgencies();
  }

  retrieveAllAgencies() {
    this.agencyService.getAll().subscribe(
      (result:any) => {
        this.agencies =result;
        setTimeout(() =>{
          this.loading = false;
        },1500)},
      (error:any) => {
        this.messageService.add({severity:'error', summary:'Erreur', detail:"Une erreur est survenu"});
        this.loading = false;
      }
    );
  }

  update(selectedAgency:User){
    this.route.navigate(['ezlocprimary/primary-module/updateAgency',selectedAgency.id])
  }

  delete(selectedAgency:number){
    this.loading = true;
    this.agencyService.delete(selectedAgency).
    subscribe(
      response => {
        this.retrieveAllAgencies()
      },
      (error:any) => {
        this.messageService.add({severity:'error', summary:'Erreur', detail:"Une erreur est survenu"});
        this.loading = false;
      }
    );
  }


}
