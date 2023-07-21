import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DlgModifyComponent } from './components/dlg-modify/dlg-modify.component';

@Component({
  selector: 'formato-numero',
  templateUrl: './formato-numero.component.html',
  styleUrls: ['./formato-numero.component.css']
})
export class FormatoNumeroComponent implements OnInit {

  public principal_number: string = "1.000,54";
  formato: number = 1;

  constructor(private _dialog: MatDialog){}

  ngOnInit(): void {
    this.loadLocalStorage()
  }

  openModifyDialog(){
    const dialogRef = this._dialog.open(DlgModifyComponent);

    dialogRef.afterClosed().subscribe(
      (value) => {
        if (value) {
          console.log(value);
          this.principal_number = value.number;
          this.formato = value.format;
          this.saveLocalStorage();
        }
      }
    )
  }

  private saveLocalStorage(): void{
    localStorage.setItem('number', JSON.stringify(this.principal_number))
  }

  private loadLocalStorage(): void{
    if ( !localStorage.getItem('number') ) return;
    this.principal_number = JSON.parse(localStorage.getItem('number')!)
  }

}
