import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../entity/Usuario'
import { VariablesGlobalesProvider } from '../variables-globales/variables-globales';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistroProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
  }

  crearUsuario(usuario: Usuario){
    return this.http.post(this.vagl.ip+"/crearUsuario", usuario);
  }

  validarUsuario(email: String): Observable<String> {
    let url = this.vagl.ip + "validarUsuario";

    return this.http.post<String>(url, email);
  }
}
