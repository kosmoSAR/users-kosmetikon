import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';
import { tap, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private url:string = 'http://kosmetikon.myqnapcloud.com:44444'

  constructor(private http:HttpClient) { }

  getFile(name:string){
    console.log(name);
    return this.http.get(`${this.url}/images/${name}`, {responseType: 'blob'})
    .pipe(
      tap( contect => {
        const blob = new Blob([contect]);
        fileSaver.saveAs(blob, name)
      }),
      map( () => true )
    )
  }

  uploadFile(file: Blob):Observable<any>{
    const imagen = new FormData();
    imagen.append('ARCHIVO', file );
    return this.http.post(`${this.url}/newImage` , imagen )
  }
}
