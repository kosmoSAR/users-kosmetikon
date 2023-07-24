import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Business } from '../interfaces/business.interface';

@Injectable({
  providedIn: 'root'
})
export class BussinesService {

  private businessCompanies:BehaviorSubject<Business[]> = new BehaviorSubject<Business[]>([]);
  private businessCompanies$ = this.businessCompanies.asObservable();

  getBussinesCompanies(): Observable<Business[]>{
    return this.businessCompanies$;
  }

  createBusiness(business: Business): void{
    const companiesList = this.businessCompanies.getValue();
    companiesList.push(business);
    this.businessCompanies.next(companiesList);
  }

  editBusiness( business: Business): void{
    const companiesList = this.businessCompanies.getValue();
    let businessSelect = companiesList.filter( (businessInList: Business) => businessInList.id === business.id );
    businessSelect[0].name = business.name;
    businessSelect[0].phone = business.phone;
    this.businessCompanies.next(companiesList);
  }

  deleteBusiness( id: string ): void{
    const companiesList = this.businessCompanies.getValue();
    const businessFiltered = companiesList.filter( (businessInList: Business) => businessInList.id !== id );
    this.businessCompanies.next(businessFiltered);
  }

}
