import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BussinesService } from './services/bussines.service';
import { MatDialog } from '@angular/material/dialog';
import { DlgDeleteBussinesComponent } from './components/dlg-delete-bussines/dlg-delete-bussines.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public bussinesList: any[] = [];
  public usersList: any[] = []
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _bussinesService: BussinesService, private _dialog: MatDialog){}

  ngOnInit(): void {
    this.loadBussines();
  }

  loadBussines() {
    this.bussinesList = this._bussinesService.getBussines()
  }

  userListInfo( usersList: any ){
    this.usersList = usersList
  }

  dialogBussinesDelete( bussines: any ){
    console.log(bussines);
    const dialogRef = this._dialog.open(DlgDeleteBussinesComponent, { data: {bussines, tipo:"bussines"} });
    dialogRef.afterClosed().subscribe(console.log)
  }

  dialogUsersDelete( user: any){
    const dialogRef = this._dialog.open(DlgDeleteBussinesComponent, { data: {user, tipo:"usuario"} });
    dialogRef.afterClosed().subscribe(console.log)
  }

}
