import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.scss']
})
export class MenuComponentComponent implements OnInit {

  
  items: MenuItem[];


  constructor() { }

  
  ngOnInit(): void {
    this.items = [
      {
          label: 'Tableau de Bord',
          icon: 'fas fa-home',
      },
      {
          label: 'Paramètres',
          icon: 'fas fa-cogs',
        
      },
      {
          label: 'Agents',
          icon: 'fas fa-user',
      },
      {
          label: 'Agences',
          icon: 'fas fa-building',
      },
      {
        label: 'Réservations',
        icon: 'fas fa-file-contract',
    },
    {
        label: 'Véhicules',
        icon: 'fas fa-car',
    },
    {
        label: 'Clients',
        icon: 'fas fa-users',
    },
    {
        label: 'Statistiques',
        icon: 'fas fa-chart-pie',
    },
  ];
  }

  
}
