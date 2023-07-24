import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { FilesService } from 'src/app/pictures-module/services/files.service';
import { BussinesService } from '../../services/bussines.service';

@Component({
  selector: 'bussines-list',
  templateUrl: './bussines-list.component.html',
  styleUrls: ['./bussines-list.component.css']
})
export class BussinesListComponent implements OnChanges, OnInit{

  displayedColumns: string[] = ['id', 'name', 'phone', 'ACCIONES']
  public bussinesList!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>; //   <ListadoTableItem>;
  dataSource: MatTableDataSource<any>; //ListadoTableDataSource;

  constructor(private _bussinesService: BussinesService){
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this._bussinesService.getBussinesCompanies().subscribe((data: any) => {
      this.bussinesList = data
      this.dataSource.data = this.bussinesList
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.dataSource.data = this.bussinesList;
      this.dataSource.sort = this.sort;
  }

  @Output() infoDelete: EventEmitter<any> = new EventEmitter();

  onDelete(infoDelete: any){ this.infoDelete.emit(infoDelete) }

  @Output() businessId: EventEmitter<any> = new EventEmitter();

  usersInfo( id: string ){ this.businessId.emit(id) }

  @Output() infoEdit: EventEmitter<any> = new EventEmitter();

  onEdit( infoEdit: any ){ this.infoEdit.emit(infoEdit) }
}
