import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/interfaces/users.interfaces';
import { DlgDeleteComponent } from '../dlg-delete/dlg-delete.component';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];

  public datos:any;
  public cargos:any;

  @Input() public userList!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public userInfo!: Usuarios;
  public dataSource: any;

  constructor(private dialogDelete: MatDialog){}

  ngOnInit(): void {
    console.log(this.userList);
    this.dataSource = new MatTableDataSource( this.userList )
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog( user:any, event: string ){

  }

  eliminar( user: any ){
    this.dialogDelete.open(DlgDeleteComponent, {
      data: { EMAIL: user.EMAIL, NOMBRE: user.NOMBRE},
    });
  }



}
