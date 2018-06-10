import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../../entity/Usuario";
import { VariablesGlobalesProvider } from "../variables-globales/variables-globales";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RegistroProvider {
  constructor(
    public http: HttpClient,
    public vagl: VariablesGlobalesProvider
  ) {}

  crearUsuario(usuario: Usuario) {
    return this.http.post(this.vagl.ip + "/crearUsuario", usuario);
  }

  validarUsuario(email: String): Observable<String> {
    let url = this.vagl.ip + "validarUsuario";

    return this.http.post<String>(url, email);
  }

  guardarFoto(idUsuario: number, token: File) {
    const formdata: FormData = new FormData();
    // console.log("id" + idUsuario)
    formdata.append('file', token);
    let json = '{"idUsuario": '+idUsuario+'}';
    // console.log(json);
    formdata.append('usuario', json);
    const req = new HttpRequest('POST', this.vagl.ip + "createUsuario", formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);

    // return this.http.post(this.vagl.ip + "createUsuario", {
    //   usuario: idUsuario,
    //   file: token
    // });
  }
}
