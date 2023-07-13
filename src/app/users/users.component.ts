import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Usuarios } from '../interfaces/users.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DlgUsersComponent } from './components/dlg-users/dlg-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public userList!: any[];

  constructor( private _userService: UsersService, public dialog: MatDialog ){}

  getData(){
    this._userService.getUserList().subscribe({
      next: ( resp: any ) => {
        this.userList = resp.data;
        console.log(this.userList);
        // this.dataSource = new MatTableDataSource( this.userList )
        // this.dataSource.paginator = this.paginator;
      },
      error: ( error: string ) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.userList);
  }

  openDialog(event: string) {
    this.dialog.open(DlgUsersComponent, { data: { user:null , event} });
  }




}
