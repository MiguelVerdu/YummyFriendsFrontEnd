import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudad } from '../../entity/Ciudad';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CiudadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CiudadProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CiudadProvider Provider');
  }

  getCiudades():Observable<any>{
    return this.http.get("http://192.168.100.6:8080/getCiudades");
  }

}
