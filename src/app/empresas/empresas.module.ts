import { NgModule } from '@angular/core';
import { EmpresasComponent } from './empresas.component';
import { SharedModule } from '../shared/shared.module';
import { BussinesRoutingModule } from './empresas-routing.module';
import { BussinesListComponent } from './components/bussines-list/bussines-list.component';
import { UsersBussinesListComponent } from './components/users-bussines-list/users-bussines-list.component';
import { DlgDeleteBussinesComponent } from './components/dlg-delete-bussines/dlg-delete-bussines.component';
import { DlgEditBussinesComponent } from './components/dlg-edit-bussines/dlg-edit-bussines.component';


@NgModule({
  declarations: [
    EmpresasComponent,
    BussinesListComponent,
    UsersBussinesListComponent,
    DlgDeleteBussinesComponent,
    DlgEditBussinesComponent
  ],
  imports: [
    SharedModule,
    BussinesRoutingModule
  ],
})

export class BussinesModule { }

