import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../entity/Usuario';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';

@Injectable()
export class LoginProvider {
  usuario: Usuario;

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello LoginProvider Provider');
  }

  comprobarLogin(pass: String, email: String) {
    this.usuario.password = pass;
    this.usuario.mail = email;
    let headers = new HttpHeaders();

    return this.http.post(this.vagl.ip + "login", this.usuario, { headers: headers });
  }

}
