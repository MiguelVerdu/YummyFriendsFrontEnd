import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../entity/Usuario';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello LoginProvider Provider');

  }

  comprobarLogin(pass: String, email: String) {
    let usuario = new Usuario();
    usuario.password = pass;
    usuario.mail = email;
    let headers = new HttpHeaders();

    return this.http.post(this.vagl.ip + "login", usuario, { headers: headers });
  }

}
