import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardian} from './guard/login-guardian';

const routes: Routes = [
  { path:'initial', loadChildren: () => import('./login/login.module').then(res => res.LoginModule)},
  { path:'users', loadChildren: () => import('./users/users.module').then(res => res.UsersModule), canActivate:[LoginGuardian]},
  { path:'pictures', loadChildren: () => import('./pictures-module/pictures-module.module').then(res => res.PicturesModuleModule), canActivate:[LoginGuardian]},
  { path:'format', loadChildren: () => import('./formato-numero/formato-numero.module').then(res => res.FormatoNumeroModule), canActivate:[LoginGuardian]},
  { path:'bussines', loadChildren: () => import('./empresas/empresas.module').then(res => res.BussinesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
