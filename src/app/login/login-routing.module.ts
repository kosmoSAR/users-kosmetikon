import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { InitialLoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path:"", component: LoginComponent, children: [
    { path: "login", component: InitialLoginComponent },
    { path: "register", component: RegisterComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full'},
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
