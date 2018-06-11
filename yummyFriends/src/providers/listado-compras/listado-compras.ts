import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { VariablesGlobalesProvider } from '../variables-globales/variables-globales';
import { Compra } from '../../entity/compra';
import { Venta } from '../../entity/Venta';

@Injectable()
export class ListadoComprasProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello ListadoComprasProvider Provider');
  }

  getCompras(tipo: string): Observable<Compra[]>{
    return this.http.get<Compra[]>(this.vagl.ip + "obtenerCompras/"+tipo);
  }

  getVenta(idCompra: number): Observable<Venta>{
    return this.http.get<Venta>(this.vagl.ip + "getInfoVentaCompra/" + idCompra);
  }

  actualizarCompra(idCompra: number){
    return this.http.get(this.vagl.ip + "actualizarCompra/" + idCompra);
  }
}
