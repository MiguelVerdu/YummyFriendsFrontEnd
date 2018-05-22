import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';
import { Usuario } from '../../entity/Usuario';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecuperarPassProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello RecuperarPassProvider Provider');
  }

  recuperarPass(email: String): Observable<any> {
    // let headers = new HttpHeaders();
    let url = this.vagl.ip + "recuperarPass";
    // let usuario = new Usuario();
    // usuario.mail = email;
    // console.log("url: " + url + ", email: " + email)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, {mail: email}, {headers: headers});
  }

  getUsuarios(): Observable<any>{
    let url = this.vagl.ip+"getUsuarios";
    return this.http.get(url);
  }

}
