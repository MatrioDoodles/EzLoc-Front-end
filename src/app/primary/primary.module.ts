import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryRoutingModule } from './primary-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PrimaryComponent } from './primary.component';
import { MenuComponentComponent } from './MiscComponents/menu/menu-component.component';
import { WelcomeComponentComponent } from './MiscComponents/welcome/welcome-component.component';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { HeaderComponentComponent } from './MiscComponents/header/header-component.component';
import { SidebarModule } from 'primeng/sidebar';
import { DockModule } from 'primeng/dock';
import { MainComponentComponent } from './DashboardComponents/main-component/main-component.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AgentFormComponent } from './AgentComponents/agent-form/agent-form.component';
import { ListAgentsComponent } from './AgentComponents/agents-list/list-agents.component';
import { TableModule } from "primeng/table";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SettingsComponent } from './MiscComponents/settings/settings.component';
import { TabViewModule } from "primeng/tabview";
import { MatIconModule } from "@angular/material/icon";
import { AgencyFormComponent } from './AgenciesComponents/agency-form/agency-form.component';
import { AgencyListComponent } from './AgenciesComponents/agency-list/agency-list.component';
import { CarFormComponent } from './CarsComponents/car-form/car-form.component';
import { CarListComponent } from './CarsComponents/car-list/car-list.component';
import { MatCheckboxModule } from "@angular/material/checkbox";



@NgModule({
  declarations: [
    PrimaryComponent,
    MenuComponentComponent,
    WelcomeComponentComponent,
    HeaderComponentComponent,
    MainComponentComponent,
    AgentFormComponent,
    ListAgentsComponent,
    SettingsComponent,
    AgencyFormComponent,
    AgencyListComponent,
    CarFormComponent,
    CarListComponent
  ],
  imports: [
    CommonModule,
    PrimaryRoutingModule,
    PanelMenuModule,
    PanelModule,
    MenubarModule,
    ButtonModule,
    SidebarModule,
    DockModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MatSidenavModule,
    TableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ProgressSpinnerModule,
    TabViewModule,
    MatIconModule,
    MatCheckboxModule,

  ]
})
export class PrimaryModule { }
