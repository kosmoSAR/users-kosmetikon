import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, tap, map } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { UsersBusinessService } from '../../services/users-business.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'users-bussines-list',
  templateUrl: './users-bussines-list.component.html',
  styleUrls: ['./users-bussines-list.component.css']
})
export class UsersBussinesListComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['ID', 'NOMBRE', 'PHONE', 'ACCIONES']
  public usersList!: any[];

  constructor(private _userService: UsersBusinessService){
    this.dataSource = new MatTableDataSource<any>([]);
  }

  @Input() businessId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>; //   <ListadoTableItem>;
  dataSource: MatTableDataSource<any>; //ListadoTableDataSource;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this._userService.filterUsers(this.businessId)

    this._userService.getUsersFilteredCompanies().subscribe((data: any) => {
      console.log(data);
      this.usersList = data
      this.dataSource.data = this.usersList
    })
  }

  @Output() user: EventEmitter<any> = new EventEmitter();

  onDelete(userList: any){
    this.user.emit(userList)
  }

  @Output() userEdit: EventEmitter<any> = new EventEmitter();

  onEdit(user: any){
    this.userEdit.emit(user)
  }

}
