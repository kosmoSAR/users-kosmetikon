import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
export class UsersListComponent implements OnInit, OnChanges{

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];

  public datos:any;
  
  @Input() public userList: any[] = [];
  @Input() public cargos: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public userInfo!: Usuarios;
  public dataSource: any;

  constructor(private dialogDelete: MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userList.length > 0) {
      this.loadData();
    }
  }

  ngOnInit(): void {
  }

  loadData():any{
    this.dataSource = new MatTableDataSource( this.userList )
    this.dataSource.paginator = this.paginator;
    console.log(this.userList);
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

  @Output() user: EventEmitter<any> = new EventEmitter();

  onUserEdit( obj: any ){
    const { user, event} = obj;
    console.log({user, event});
    this.user.emit(obj)
  }

}
