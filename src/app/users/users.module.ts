import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

//Componentes
import { UsersComponent } from './users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DlgUsersComponent } from './components/dlg-users/dlg-users.component';
import { DlgDeleteComponent } from './components/dlg-delete/dlg-delete.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    DlgUsersComponent,
    DlgDeleteComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})

export class UsersModule { }
