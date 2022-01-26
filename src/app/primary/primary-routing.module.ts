import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponentComponent } from './MiscComponents/welcome-component/welcome-component.component';
import {AddAgentComponent} from "./AgentComponents/add-agent/add-agent.component";
import {ListAgentsComponent} from "./AgentComponents/list-agents/list-agents.component";


const primaryRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponentComponent},
  { path: 'users', component: ListAgentsComponent },
  { path: 'addUser', component: AddAgentComponent},
  { path: 'addUser/:id', component: AddAgentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(primaryRoutes)],
  exports: [RouterModule]
})
export class PrimaryRoutingModule { }
