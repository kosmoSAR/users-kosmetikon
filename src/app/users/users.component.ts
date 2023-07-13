import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Usuarios } from '../interfaces/users.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DlgUsersComponent } from './components/dlg-users/dlg-users.component';
import { DlgDeleteComponent } from './components/dlg-delete/dlg-delete.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( private _userService: UsersService, public dialog: MatDialog ){ }

  public usersList: any[] = [];
  public cargos:any;
  public cargoSeleccionado:any;

  ngOnInit(): void {
    this.getData()
    this.loadCargos()
  }

  getData(){
    this._userService.getUserList().subscribe({
      next: ( resp: any ) => {
        this.usersList = resp.data;
      },
      error: ( error: string ) => {
        console.log(error);
      }
    });
  }

  loadCargos(){
    this._userService.getPositionList().subscribe({
      next: (resp) => {
        this.cargos = resp
        console.log(this.cargos);
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
        this._userService.deleteUser( resp ).subscribe({
          next: (resp) => {
            console.log(resp);
            this.getData();
          },
          error: (error) => {
            console.log(error);
          }
        })
      })
    }

    if ( event !== 'delete') {
      const dialogref = this.dialog.open(DlgUsersComponent, { data: { user:user , event, cargo:this.cargoSeleccionado} });
      if ( event === 'new') {
        dialogref.beforeClosed().subscribe( (resp) => {
          this._userService.newUser( resp ).subscribe({
            next: (resp) => {
              console.log(resp);
              this.getData();
            },
            error: (error) => {
              console.log(error);
            }
          })
        })
      }

      if ( event === 'update') {
        dialogref.beforeClosed().subscribe( (resp) => {
          this._userService.updateUser( resp ).subscribe({
            next: (resp) => {
              console.log(resp);
              this.getData();
            },
            error: (error) => {
              console.log(error);
            }
          })
        })
      }
    }
  }
}
