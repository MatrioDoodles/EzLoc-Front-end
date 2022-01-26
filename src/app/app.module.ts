import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptorService} from "./services/auth-services/http-interceptor.service";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import { FirstTimeSetupComponent } from './first-time-setup/first-time-setup.component';
import {StepsModule} from "primeng/steps";
import {MatStepperModule} from '@angular/material/stepper';
import {CascadeSelectModule} from "primeng/cascadeselect";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FirstTimeSetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    StepsModule,
    MatStepperModule,
    InputTextModule,
    CascadeSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
