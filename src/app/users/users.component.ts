import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Usuarios } from '../interfaces/users.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DlgUsersComponent } from './components/dlg-users/dlg-users.component';
import { DlgDeleteComponent } from './components/dlg-delete/dlg-delete.component';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorService } from '../services/behavior.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnChanges {

  constructor( private _userService: UsersService, public dialog: MatDialog, private _snackBar:MatSnackBar,
    private _behavior: BehaviorService ){ }

    public obsSubject = new Subject<any>()

    public usersList: any[] = [];
    public cargos:any;
    public cargoSeleccionado:any;

    ngOnInit(): void {

      this.obsSubject.subscribe( (data) => {
        this.usersList = data
      } )

      this.getData()
      this.loadCargos()
    }

    ngOnChanges(changes: SimpleChanges): void {
      this._behavior.obsMessage$.subscribe( (data) => {
        console.log(data);
      })
    }
  getData(){
    this._behavior.obsSubject$.subscribe( (resp) => {
      this.obsSubject.next(resp.data)
    });
  }

  loadCargos(){
    this._userService.getPositionList().subscribe({
      next: (resp) => {
        this.cargos = resp
      }
    })
  }

  onUser( obj: any ){
    const { user, event} = obj;

    if ( user !== null && event === 'update') {
      for (let i = 0; i < this.cargos.length; i++) {
        if ( user.ID_CARGO === this.cargos[i].ID_CARGO) {
          this.cargoSeleccionado = this.cargos[i].CARGO
        }
      }
    }

    if ( event === 'delete') {
      const dialogref = this.dialog.open(DlgDeleteComponent, { data: { user:user , event } });
      dialogref.beforeClosed().subscribe( (resp) => {
        this._behavior.deleteUser(resp)
        this._behavior.obsMessage$.subscribe( (message) => {
          this.message(message);
        })
      })
    }

    if ( event !== 'delete') {
      const dialogref = this.dialog.open(DlgUsersComponent, { data: { user:user , event, cargo:this.cargoSeleccionado} });
      if ( event === 'new') {
        dialogref.beforeClosed().subscribe( (resp) => {
          this._behavior.newUser( resp );
          this._behavior.obsMessage$.subscribe( (message) => {
            this.message(message);
          })
        })
      }

      if ( event === 'update') {
        dialogref.beforeClosed().subscribe( (resp) => {
          this._behavior.updateUser( resp );
          this._behavior.obsMessage$.subscribe( (message) => {
            this.message(message);
          })
        })
      }
    }
  }

  message( respuesta: string ){
    this._snackBar.open(respuesta, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };

}
