import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Usuarios } from '../../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BussinesService {

  private businessCompanies:BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private businessCompanies$ = this.businessCompanies.asObservable();

  getBussinesCompanies(): Observable<any[]>{
    return this.businessCompanies$;
  }

  createBusiness(business: any){
    const companiesList = this.businessCompanies.getValue();
    companiesList.push(business);
    this.businessCompanies.next(companiesList);
  }

  editBusiness( business: any ){
    const companiesList = this.businessCompanies.getValue();
    let businessSelect = companiesList.filter( (businessInList:any) => businessInList.id === business.id );
    businessSelect[0].name = business.name;
    businessSelect[0].phone = business.phone;
    this.businessCompanies.next(companiesList);
  }

  deleteBusiness( id: string ){
    const companiesList = this.businessCompanies.getValue();
    const businessFiltered = companiesList.filter( (businessInList:any) => businessInList.id !== id );
    this.businessCompanies.next(businessFiltered);
  }

  // editUser( user:any ){
  //   const businessList = this.list;
  //   for( let business of businessList ){
  //     const userInList: any = business.usuarios.filter( (userInList: any) => userInList.id === user.id )
  //     if (userInList[0]) {
  //       userInList[0].nombre = user.name
  //       userInList[0].phone = user.phone
  //     }
  //   }
  //   localStorage.setItem('list', JSON.stringify(businessList));
  // }


  // deleteUser(id: string){
  //   const businessList = this.list;
  //   for( let business of businessList ){
  //     const listUsers = business.usuarios.filter( (userInList: any) => userInList.id !== id )
  //     business.usuarios = listUsers
  //   }
  //   localStorage.setItem('list', JSON.stringify(businessList));
  // }

}
