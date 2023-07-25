import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DlgDeleteBussinesComponent } from './components/dlg-delete-bussines/dlg-delete-bussines.component';
import { DlgEditBussinesComponent } from './components/dlg-edit-bussines/dlg-edit-bussines.component';
import { DlgCreateComponent } from './components/dlg-create/dlg-create.component';
import { Business } from './interfaces/business.interface';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {

  public businessId!: string;
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _dialog: MatDialog){}

  ngOnDestroy(): void {
    this.notifier$.next(true);
    this.notifier$.complete();
  }

  idBusiness( id: string ): void{
    this.businessId = id;
  }

  dialogBussinesDelete( bussines: Business, tipo: string ): void{
    const dialogRef = this._dialog.open(DlgDeleteBussinesComponent, { data: {bussines, tipo} });
    dialogRef.afterClosed().pipe(
      takeUntil(this.notifier$)
    ).subscribe((message: string) => {
      if (message === this.businessId) {
        this.businessId = '';
      }
    })
  }

  dialogEdit( business: Business, tipo: string ): void{
    this._dialog.open(DlgEditBussinesComponent, { data: {business, tipo} });
  }

  dialogCreate( tipo: string ): void{
    if ( tipo === 'newBusiness') {
      this._dialog.open(DlgCreateComponent, { data: tipo });
    }

    if (tipo === 'newUser') {
      this._dialog.open(DlgCreateComponent, { data: {tipo, id:this.businessId} });
    }
  }

}
