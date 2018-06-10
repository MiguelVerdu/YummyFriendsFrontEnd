import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VariablesGlobalesProvider } from '../variables-globales/variables-globales';
import { Venta } from '../../entity/Venta';
import { Producto } from '../../entity/producto';

@Injectable()
export class DetalleVentaProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello DetalleVentaProvider Provider');
  }

  crearVenta(venta: Venta){
    return this.http.post(this.vagl.ip + "crearVenta", venta);
  }

  crearProducto(producto: Producto){
    return this.http.post(this.vagl.ip + "createProducto", producto);
  }

  guardarFoto(idVenta: number, token: File) {
    const formdata: FormData = new FormData();
    // console.log("id" + idVenta)
    formdata.append('file', token);
    let json = '{"idVenta": '+idVenta+'}';
    // console.log(json);
    formdata.append('usuario', json);
    const req = new HttpRequest('POST', this.vagl.ip + "createUsuario", formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
