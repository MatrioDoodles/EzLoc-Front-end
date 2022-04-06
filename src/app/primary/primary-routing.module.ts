import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponentComponent } from './MiscComponents/welcome/welcome-component.component';
import { AgentFormComponent } from "./AgentComponents/agent-form/agent-form.component";
import { ListAgentsComponent } from "./AgentComponents/agents-list/list-agents.component";
import { SettingsComponent } from "./MiscComponents/settings/settings.component";
import {AgencyFormComponent} from "./AgenciesComponents/agency-form/agency-form.component";
import { AgencyListComponent } from './AgenciesComponents/agency-list/agency-list.component';
import {CarListComponent} from "./CarsComponents/car-list/car-list.component";
import {CarFormComponent} from "./CarsComponents/car-form/car-form.component";


const primaryRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponentComponent},
  { path: 'options', component: SettingsComponent},
  { path: 'users', component: ListAgentsComponent },
  { path: 'addUser', component: AgentFormComponent},
  { path: 'updateUser/:id', component: AgentFormComponent},
  { path: 'addAgency', component: AgencyFormComponent},
  { path: 'updateAgency/:id', component: AgencyFormComponent},
  { path: 'agencies', component: AgencyListComponent},
  { path: 'addCar', component: CarFormComponent},
  { path: 'updateCar/:id', component: CarFormComponent},
  { path: 'cars', component: CarListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(primaryRoutes)],
  exports: [RouterModule]
})
export class PrimaryRoutingModule { }
