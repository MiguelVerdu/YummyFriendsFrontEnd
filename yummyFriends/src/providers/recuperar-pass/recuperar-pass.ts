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

  recuperarPass(email: String): Observable<String> {
    // let headers = new HttpHeaders();
    let url = this.vagl.ip + "recuperarPass2";
    let usuario = new Usuario(null,null,null,null,null,null,null,null,email,null);
    // usuario.mail = email;
    // console.log("url: " + url + ", email: " + email)
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType' : 'text/plain' });

    // let json = JSON.stringify(email);
    // console.log("json: " + json)
    // let params = "json="+json;
    // let headers = new HttpHeaders().set('Content-Type','text/plain');

    return this.http.post<String>(url, usuario);
  }

  enviarEmail(email: string){
    return this.http.get(this.vagl.ip + "enviarEmail/" + email);
  }

  getUsuarios(): Observable<any>{
    let url = this.vagl.ip+"getUsuarios";
    return this.http.get(url);
  }

}
