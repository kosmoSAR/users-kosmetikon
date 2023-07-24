import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DlgModifyComponent } from './components/dlg-modify/dlg-modify.component';

@Component({
  selector: 'formato-numero',
  templateUrl: './formato-numero.component.html',
  styleUrls: ['./formato-numero.component.css']
})
export class FormatoNumeroComponent {

  public principal_number: string = "1.000,54";
  formato: number = 1;

  constructor(private _dialog: MatDialog){}

  openModifyDialog(){
    const dialogRef = this._dialog.open(DlgModifyComponent);

    dialogRef.afterClosed().subscribe(
      (value) => {
        if (value) {
          console.log(value);
          this.principal_number = value.number;
          this.formato = value.format;
        }
      }
    )
  }

}
