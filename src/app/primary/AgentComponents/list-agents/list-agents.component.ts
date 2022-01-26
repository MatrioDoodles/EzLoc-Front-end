import { Component, OnInit } from '@angular/core';
import {User} from "../../../services/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/services/user.service";
import {MessageService} from "primeng/api";
import {RolesService} from "../../../services/services/role.services";
import {MiscService} from "../../../services/services/misc.service";

@Component({
  selector: 'app-list-agents',
  templateUrl: './list-agents.component.html',
  styleUrls: ['./list-agents.component.scss'],
  providers :[MessageService],
})
export class ListAgentsComponent implements OnInit {

  users:User[]=[];
  loading: boolean = true;
  userTypeString:any;
  constructor(private userService:UserService,
              private route:Router,
              private router: ActivatedRoute,
              private messageService: MessageService,
              private miscService: MiscService,) { }

  ngOnInit(): void {
this.retrieveAllUsers();
  }

  retrieveAllUsers() {
    this.userService.getAll().subscribe(
      (result:any) => {
        this.users =result;
        setTimeout(() =>{
          this.loading = false;
        },1500)},
      (error:any) => {
        this.messageService.add({severity:'error', summary:'Erreur', detail:"Une erreur est survenu"});
        this.loading = false;
      }
    );
  }

  update(selectedUser:User){
    this.route.navigate(['ezlocprimary/primary-module/addUser',selectedUser.id])
  }

  delete(selectedUser:any){
    this.loading = true;
    this.userService.delete(selectedUser).
    subscribe(
      response => {
        this.retrieveAllUsers()
      },
      (error:any) => {
        this.messageService.add({severity:'error', summary:'Erreur', detail:"Une erreur est survenu"});
        this.loading = false;
      }
    );
  }


}
