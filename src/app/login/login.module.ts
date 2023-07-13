import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes
import { RegisterComponent } from './components/register/register.component';
import { InitialLoginComponent } from './components/login/login.component';
import { LoginComponent } from './login.component';


//Modulos
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    InitialLoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})

export class LoginModule { }
