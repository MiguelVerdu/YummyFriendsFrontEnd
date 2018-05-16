import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudad } from '../../entity/Ciudad';
import { Observable } from 'rxjs/Observable';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';

@Injectable()
export class CiudadProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {

  }

  getCiudades():Observable<any>{
    console.log(this.vagl.ip+"getCiudades")
    let url = this.vagl.ip+"getCiudades";
    return this.http.get(url);
  }

}
