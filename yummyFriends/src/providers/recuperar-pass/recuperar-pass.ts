import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';

@Injectable()
export class RecuperarPassProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello RecuperarPassProvider Provider');
  }

  recuperarPass(email:String){
    let headers = new HttpHeaders();

    // return this.http.post(this.vagl + "recuperarPass", email, {headers: headers});
  }

}
