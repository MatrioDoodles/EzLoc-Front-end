import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  items: MenuItem[];
  dockItems: MenuItem[];
  display:any;
  constructor(
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.items = [
      {
          label: 'Tableau de Bord',
          icon: 'fas fa-tachometer-alt',
          routerLink: "/ezlocprimary/primary-module/welcome",
      },
      {
          label: 'Agents',
          icon: 'fas fa-users',
        items: [
          {
            label: 'Ajouter agent',
            icon: 'fas fa-user-plus',
            routerLink: "/ezlocprimary/primary-module/addUser",
          },
          {
            label: 'Liste agents',
            icon: 'fas fa-list',
            routerLink: "/ezlocprimary/primary-module/users",
          },
        ]
      },
      {
          label: 'Agences',
          icon: 'fas fa-building',
        items: [
          {
            label: 'Ajouter agence',
            icon: 'fas fa-plus',
          },
          {
            label: 'Liste agences',
            icon: 'fas fa-list',
          },
        ]
      },
      {
        label: 'Réservations',
        icon: 'fas fa-file-contract',
        items: [
          {
            label: 'Ajouter réservation',
            icon: 'fas fa-plus',
          },
          {
            label: 'Liste réservations',
            icon: 'fas fa-list',
          },
        ]
    },
    {
        label: 'Véhicules',
        icon: 'fas fa-car',
      items: [
        {
          label: 'Ajouter véhicule',
          icon: 'fas fa-plus',
        },
        {
          label: 'Liste véhicules',
          icon: 'fas fa-list',
        },
      ]
    },
    {
        label: 'Clients',
        icon: 'fas fa-address-book',
      items: [
        {
          label: 'Ajouter client',
          icon: 'fas fa-plus',
        },
        {
          label: 'Liste clients',
          icon: 'fas fa-list',
        },
      ]
    },
    {
        label: 'Statistiques',
        icon: 'fas fa-chart-pie',
    },
    {
        label: 'Options',
        icon: 'fas fa-cogs',
      routerLink: "/ezlocprimary/primary-module/options",

    },
  ];
    this.dockItems = [
      {
        label: 'Tableau de Bord',
        icon: '../../../../assets/icones/accueil.svg',
        routerLink: "/ezlocprimary/primary-module/welcome",
      },
      {
        label: 'Agents',
        icon: '../../../../assets/icones/agent.png',
        routerLink: "/ezlocprimary/primary-module/users",
      },
      {
        label: 'Agences',
        icon: '../../../../assets/icones/buildings.png',
      },
      {
        label: 'Réservations',
        icon: '../../../../assets/icones/contract.svg',
      },
      {
        label: 'Véhicules',
        icon: '../../../../assets/icones/voiture.gif',
      },
      {
        label: 'Clients',
        icon: '../../../../assets/icones/client.png',
      },
      {
        label: 'Statistiques',
        icon: '../../../../assets/icones/camembert.gif',
      },
      {
        label: 'Options',
        icon: '../../../../assets/icones/services.gif',
        routerLink: "/ezlocprimary/primary-module/options",

      },
    ];
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['login']);

  }
}
