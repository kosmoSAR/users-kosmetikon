import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private url:string = 'http://kosmetikon.myqnapcloud.com:44444'

  constructor(private http:HttpClient) { }

  getPictures():Observable<any>{
    return this.http.get<any>(`${this.url}/getImageList`).pipe(
      map( pictures => pictures.data )
    )
  }

  deletePictures(id: any):Observable<any>{
    return this.http.delete<any>(`${this.url}/deleteImage`, {body: id} )
  }
}
