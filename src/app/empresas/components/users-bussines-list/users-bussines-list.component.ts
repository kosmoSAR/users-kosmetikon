import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, tap, map } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { UsersBusinessService } from '../../services/users-business.service';
import { MatSort } from '@angular/material/sort';
import { UsersBusiness } from '../../interfaces/usersBusiness.interfaces';

@Component({
  selector: 'users-bussines-list',
  templateUrl: './users-bussines-list.component.html',
  styleUrls: ['./users-bussines-list.component.css']
})
export class UsersBussinesListComponent implements OnChanges {

  displayedColumns: string[] = ['ID', 'NOMBRE', 'PHONE', 'ACCIONES']
  public usersList!: UsersBusiness[];

  constructor(private _userService: UsersBusinessService){
    this.dataSource = new MatTableDataSource<UsersBusiness[]>([]);
  }

  @Input() businessId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>; //   <ListadoTableItem>;
  dataSource: MatTableDataSource<any>; //ListadoTableDataSource;

  @Output() userDelete: EventEmitter<UsersBusiness> = new EventEmitter();
  @Output() userEdit: EventEmitter<UsersBusiness> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this._userService.filterUsers(this.businessId)

    this._userService.getUsersFilteredCompanies().subscribe((data: UsersBusiness[]) => {
      this.usersList = data
      this.dataSource.data = this.usersList
    })
  }

  onDelete(userInfo: UsersBusiness): void{ this.userDelete.emit(userInfo) }

  onEdit(user: UsersBusiness): void{ this.userEdit.emit(user) }

}
