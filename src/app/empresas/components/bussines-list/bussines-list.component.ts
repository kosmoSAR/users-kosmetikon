import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { FilesService } from 'src/app/pictures-module/services/files.service';
import { BussinesService } from '../../services/bussines.service';
import { Business } from '../../interfaces/business.interface';

@Component({
  selector: 'bussines-list',
  templateUrl: './bussines-list.component.html',
  styleUrls: ['./bussines-list.component.css']
})
export class BussinesListComponent implements OnChanges, OnInit{

  displayedColumns: string[] = ['id', 'name', 'phone', 'ACCIONES']
  public bussinesList!: Business[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>; //   <ListadoTableItem>;
  dataSource: MatTableDataSource<any>; //ListadoTableDataSource;

  @Output() infoDelete: EventEmitter<Business> = new EventEmitter();
  @Output() businessId: EventEmitter<string> = new EventEmitter();
  @Output() infoEdit: EventEmitter<Business> = new EventEmitter();


  constructor(private _bussinesService: BussinesService){
    this.dataSource = new MatTableDataSource<Business[]>([]);
  }

  ngOnInit(): void {
    this._bussinesService.getBussinesCompanies().subscribe((data: Business[]) => {
      this.bussinesList = data
      this.dataSource.data = this.bussinesList
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.dataSource.data = this.bussinesList;
      this.dataSource.sort = this.sort;
  }

  onDelete(infoDelete: Business): void{ this.infoDelete.emit(infoDelete) }

  usersInfo( id: string ): void{ this.businessId.emit(id) }

  onEdit( infoEdit: Business ): void{ this.infoEdit.emit(infoEdit) }
}
