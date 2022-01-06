import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { FirstTimeSetupComponent } from './first-time-setup/first-time-setup.component';
import { LoginComponent } from './login/login.component';
import { PrimaryComponent } from './primary/primary.component';

export const childRoutes = [
  {
    path: 'primary-module',
    loadChildren: () => import('./primary/primary.module').then(m => m.PrimaryModule)
  },
]  as Route[];
const routes: Routes = [

  { path: '',
    redirectTo: '/login',
    pathMatch: 'full' },
    { path: 'login',
    component: LoginComponent },
  { path: 'first-time-setup',
    component: FirstTimeSetupComponent },
  {
    path: 'ezlocprimary',
    component: PrimaryComponent,
    //canActivate: [RouteGuardService],
    children: childRoutes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
