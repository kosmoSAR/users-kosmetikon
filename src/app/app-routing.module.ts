import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuardian } from './login/login-guardian';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path:'users', loadChildren: () => import('./users/users.module').then(res => res.UsersModule), canActivate:[LoginGuardian]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
