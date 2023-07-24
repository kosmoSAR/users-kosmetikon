import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DlgDeleteBussinesComponent } from './components/dlg-delete-bussines/dlg-delete-bussines.component';
import { DlgEditBussinesComponent } from './components/dlg-edit-bussines/dlg-edit-bussines.component';
import { DlgCreateComponent } from './components/dlg-create/dlg-create.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {

  public businessId!: string;
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _dialog: MatDialog){}

  idBusiness( id: string ){
    this.businessId = id;
  }

  dialogBussinesDelete( bussines: any, tipo:string ){
    const dialogRef = this._dialog.open(DlgDeleteBussinesComponent, { data: {bussines, tipo} });
    dialogRef.afterClosed().subscribe((message: string) => {
      if (message === this.businessId) {
        this.businessId = '';
      }
    })
  }

  dialogEdit( business:any, tipo:string ){
    this._dialog.open(DlgEditBussinesComponent, { data: {business, tipo} });
  }

  dialogCreate( tipo:string ){
    if ( tipo === 'newBusiness') {
      this._dialog.open(DlgCreateComponent, { data: tipo });
    }

    if (tipo === 'newUser') {
      this._dialog.open(DlgCreateComponent, { data: {tipo, id:this.businessId} });
    }
  }

}
