import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BussinesService } from './services/bussines.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public bussinesList: any[] = [];
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _bussinesService: BussinesService){}

  ngOnInit(): void {
    this.loadBussines();
  }

  loadBussines() {
    this.bussinesList = this._bussinesService.getBussines()
  }

}
