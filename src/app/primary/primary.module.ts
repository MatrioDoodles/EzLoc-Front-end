import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryRoutingModule } from './primary-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PrimaryComponent } from './primary.component';
import { MenuComponentComponent } from './MiscComponents/menu-component/menu-component.component';
import { WelcomeComponentComponent } from './MiscComponents/welcome-component/welcome-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { HeaderComponentComponent } from './MiscComponents/header-component/header-component.component';
import { SidebarModule } from 'primeng/sidebar';
import { DockModule } from 'primeng/dock';
import { MainComponentComponent } from './DashboardComponents/main-component/main-component.component';
import { ListComponentComponent } from './AgentsComponents/list-component/list-component.component';
import { FormComponentComponent } from './AgentsComponents/form-component/form-component.component';
import { CardModule } from 'primeng/card';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    PrimaryComponent,
    MenuComponentComponent,
    WelcomeComponentComponent,
    HeaderComponentComponent,
    MainComponentComponent,
    ListComponentComponent,
    FormComponentComponent
  ],
  imports: [
    CommonModule,
    PrimaryRoutingModule,
    PanelMenuModule,
    BrowserAnimationsModule,
    PanelModule,
    MenubarModule,
    ButtonModule,
    SidebarModule,
    DockModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,

  ]
})
export class PrimaryModule { }
