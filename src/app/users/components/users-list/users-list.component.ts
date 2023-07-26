import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/interfaces/users.interfaces';
import { DlgDeleteComponent } from '../dlg-delete/dlg-delete.component';
import { UsersDataService } from '../../services/users-data.service';
import { UsersListService } from '../../services/usersList.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnChanges, OnInit{

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];

  public datos:any;
  public loading: boolean = true;

  @Input() public userList: any[] = [];
  public listOfUsers: Usuarios[] = [];
  @Input() public cargos: any[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public userInfo!: Usuarios;
  // public dataSource: any;

  constructor(private dialogDelete: MatDialog, private _userData: UsersDataService,
    private _usersListService: UsersListService){
    this.dataSource = new MatTableDataSource<any[]>([]);
  }

  ngOnInit(): void{
    this._userData.getUserList$().subscribe( (users) => {
      this.listOfUsers = users
      this.dataSource.data = users
      this.dataSource.paginator = this.paginator;
    })

    this._usersListService.getUsersList().subscribe( (data) => {
      console.log(data);
    })

    this._usersListService.getList().subscribe( (data) => {
      console.log(data);
    } )

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( this.listOfUsers.length ) {
      this.loading = false
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar( user: any ){
    this.dialogDelete.open(DlgDeleteComponent, {
      data: { EMAIL: user.EMAIL, NOMBRE: user.NOMBRE},
    });
  }

  @Output() user: EventEmitter<any> = new EventEmitter();

  onUserEdit( obj: any ){
    const { user, event} = obj;
    this.user.emit(obj)
  }

}
