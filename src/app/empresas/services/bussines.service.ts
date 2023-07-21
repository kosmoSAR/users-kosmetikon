import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BussinesService {

  private bussines = [
    {id:"1", name:"kosmetikon", usuarios:[{id:"1", nombre:"Santiago"},{id:"2", nombre:"Carlos"}]},
    {id:"2", name:"LinkedIn", usuarios:[{id:"3", nombre:"Steven"}]}
  ]

  private obsSubject:BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private obsSubject$ = this.obsSubject.asObservable();

  constructor() {
    this.getDatos();
  }

  getBussines(){
    return this.obsSubject$;
  }

  getDatos():void {
    this.obsSubject.next( this.bussines );
  }
}
