import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BussinesService {

  private bussines = [
    {id:"1", name:"kosmetikon", usuarios:[{id:"1", nombre:"Santiago"},{id:"2", nombre:"Carlos"}]},
    {id:"2", name:"LinkedIn", usuarios:[{id:"3", nombre:"Steven"}]}
  ]

  constructor() { }

  getBussines(){
    return this.bussines;
  }
}
