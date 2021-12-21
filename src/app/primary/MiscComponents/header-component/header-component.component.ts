import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  items: MenuItem[];
  constructor() { }
  display:any;
  ngOnInit(): void {
    this.items = [
      {
          label: 'Tableau de Bord',
          icon: '../../../../../assets/icones/icons8-accueil.svg',
      },
      {
          label: 'Paramètres',
          icon: '../../../../../assets/icones/icons8-services.gif',
        
      },
      {
          label: 'Agents',
          icon: '../../../../../assets/icones/icons8-agent-64.png',
      },
      {
          label: 'Agences',
          icon: '../../../../../assets/icones/icons8-buildings-64.png',
      },
      {
        label: 'Réservations',
        icon: '../../../../../assets/icones/contract.svg',
    },
    {
        label: 'Véhicules',
        icon: '../../../../../assets/icones/icons8-voiture.gif',
    },
    {
        label: 'Clients',
        icon: '../../../../../assets/icones/icons8-client-64.png',
    },
    {
        label: 'Statistiques',
        icon: '../../../../../assets/icones/icons8-camembert.gif',
    },
  ];
  }

  logout(){}
}
