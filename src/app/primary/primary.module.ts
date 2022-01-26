import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryRoutingModule } from './primary-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PrimaryComponent } from './primary.component';
import { MenuComponentComponent } from './MiscComponents/menu-component/menu-component.component';
import { WelcomeComponentComponent } from './MiscComponents/welcome-component/welcome-component.component';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { HeaderComponentComponent } from './MiscComponents/header-component/header-component.component';
import { SidebarModule } from 'primeng/sidebar';
import { DockModule } from 'primeng/dock';
import { MainComponentComponent } from './DashboardComponents/main-component/main-component.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import {MatSidenavModule} from "@angular/material/sidenav";
import { AddAgentComponent } from './AgentComponents/add-agent/add-agent.component';
import { ListAgentsComponent } from './AgentComponents/list-agents/list-agents.component';
import {TableModule} from "primeng/table";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    PrimaryComponent,
    MenuComponentComponent,
    WelcomeComponentComponent,
    HeaderComponentComponent,
    MainComponentComponent,
    AddAgentComponent,
    ListAgentsComponent
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

  ]
})
export class PrimaryModule { }
