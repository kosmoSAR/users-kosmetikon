import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuarios } from '../interfaces/users.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DlgUsersComponent } from './components/dlg-users/dlg-users.component';
import { DlgDeleteComponent } from './components/dlg-delete/dlg-delete.component';
import { Subject, concatMap, forkJoin, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './services/users.service';
import { UsersDataService } from './services/users-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {

  notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _userService: UsersService, public dialog: MatDialog, private _snackBar: MatSnackBar,
    private _behavior: UsersDataService) { }

  public obsSubject = new Subject<any>()

  public usersList: Usuarios[] = [];
  public cargos: any;
  public cargoSeleccionado: any;

  ngOnInit(): void {
    this.obsSubject.subscribe( (data) => {
      this.usersList = data;
    })

    this.loadData2()
  }

  ngOnDestroy(): void {
    this.notifier$.next(true);
    this.notifier$.complete();
  }

  loadData1(){
    //Forma con RxJS petición en serie.
    const request1 = this._userService.getUserList();
    const request2 = this._userService.getPositionList();

    request1.pipe(
      concatMap( (value: any) => {
        this.obsSubject.next( value.data )
        return request2;
      })
    ).subscribe( value => {
      this.cargos = value
    },
    error => {
      console.log(error);
    })
  }

  loadData2(){
    //Forma con RxJS petición en paralelo.
    const request1 = this._userService.getUserList();
    const request2 = this._userService.getPositionList();

    forkJoin( [request1 , request2] ).pipe(
      takeUntil(this.notifier$)
    ).subscribe(
    (res) => {
      this.obsSubject.next(res[0].data)
      this.cargos = res[1]
    },
    (error) => {
      console.log(error);
      this.message(error.message)
    })
  }

  onUser(obj: any) {
    const { user, event } = obj;

    if (user !== null && event === 'update') {
      for (let i = 0; i < this.cargos.length; i++) {
        if (user.ID_CARGO === this.cargos[i].ID_CARGO) {
          this.cargoSeleccionado = this.cargos[i].CARGO
        }
      }
    }

    if (event === 'delete') {
      const dialogref = this.dialog.open(DlgDeleteComponent, { data: { user: user, event } });
      dialogref.beforeClosed().subscribe((resp) => {
        if (resp !== 'null') {
          this._behavior.deleteUser(resp)
          this._behavior.getUserList$().subscribe( users => {
            this.obsSubject.next(users)
          } )
          this._behavior.getMessage$().subscribe( message => {
            this.message(message)
          })
        }
      })
    }

    if (event !== 'delete') {
      const dialogref = this.dialog.open(DlgUsersComponent, { data: { user: user, event, cargo: this.cargoSeleccionado } });
      if (event === 'new') {
        dialogref.beforeClosed().subscribe((resp) => {
          if (resp) {
            this._behavior.newUser(resp);
            this._behavior.getUserList$().subscribe( users => {
              this.obsSubject.next(users)
            } )
            this._behavior.getMessage$().subscribe( message => {
              this.message(message)
            })
          }
        })
      }

      if (event === 'update') {
        dialogref.beforeClosed().subscribe((resp) => {
          if (resp) {
            this._behavior.updateUser(resp);
            this._behavior.getUserList$().subscribe( users => {
              this.obsSubject.next(users)
            } )
            this._behavior.getMessage$().subscribe( message => {
              this.message(message)
            })
          }
        })
      }
    }
  }

  message(respuesta: string) {
    this._snackBar.open(respuesta, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };

}

