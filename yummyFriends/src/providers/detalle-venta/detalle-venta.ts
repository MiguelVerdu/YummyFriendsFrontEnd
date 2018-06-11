import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VariablesGlobalesProvider } from '../variables-globales/variables-globales';
import { Venta } from '../../entity/Venta';
import { Producto } from '../../entity/producto';
import { Observable } from "rxjs/Observable";
import { Compra } from '../../entity/compra';

@Injectable()
export class DetalleVentaProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello DetalleVentaProvider Provider');
  }

  anyadirAcarrito(compra: Compra){
    console.log("compra: " + compra)
    return this.http.post(this.vagl.ip + "crearCompra", compra);
  }

  getMaxId(): Observable<number>{
    return this.http.get<number>(this.vagl.ip + "getMaxId");
  }

  crearVenta(venta: Venta){
    console.log(venta.idVendedor)
    return this.http.post(this.vagl.ip + "crearVenta/" + venta.idVendedor, venta);
  }

  crearProducto(producto: Producto){
    return this.http.post(this.vagl.ip + "createProducto", producto);
  }

  guardarFoto(producto: Producto, token: File, idVenta: number) {
    const formdata: FormData = new FormData();
    // console.log("id" + idVenta)
    formdata.append('file', token);
    // let json = '{"idProducto": '+idProducto+'}';
    let json = JSON.stringify(producto);
    // console.log(json);
    formdata.append('producto', json);
    const req = new HttpRequest('POST', this.vagl.ip + "createProducto/"+idVenta, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
