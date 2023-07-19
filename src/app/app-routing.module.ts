import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuardian, LoginGuardian2 } from './guard/login-guardian';
import { PicturesModuleModule } from './pictures-module/pictures-module.module';


const routes: Routes = [
  { path:'initial', component: LoginComponent },
  { path:'users', loadChildren: () => import('./users/users.module').then(res => res.UsersModule), canActivate:[LoginGuardian]},
  { path:'pictures', loadChildren: () => import('./pictures-module/pictures-module.module').then(res => res.PicturesModuleModule), canActivate:[LoginGuardian]},
  { path:'format', loadChildren: () => import('./formato-numero/formato-numero.module').then(res => res.FormatoNumeroModule), canActivate:[LoginGuardian]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
