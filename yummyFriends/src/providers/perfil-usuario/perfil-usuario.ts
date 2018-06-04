import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VariablesGlobalesProvider } from '../variables-globales/variables-globales';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../entity/Usuario';

@Injectable()
export class PerfilUsuarioProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello PerfilUsuarioProvider Provider');
  }

  getUsuario(idUsuario: number): Observable<any>{
    return this.http.get(this.vagl.ip + "getUsuario/" + idUsuario);
  }

  actualizarUsuario(usuario: Usuario){
    return this.http.put(this.vagl.ip + "actualizarUsuario/" + usuario.idUsuario, usuario);
  }
}
