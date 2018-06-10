import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../../entity/Venta';
import { Observable } from 'rxjs/Observable';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';

@Injectable()
export class VentaProvider {

  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log('Hello VentaProvider Provider');
  }

  getVenta(idVenta: number): Observable<Venta>{
    return this.http.get<Venta>(this.vagl.ip + "detalleVenta/" + idVenta);
  }

  getVendedor(idVenta: number): Observable<string>{
    return this.http.get<string>(this.vagl.ip + "obtenerVendedor/" + idVenta);
  }

  getVentasRealizadas(idUsuario: number): Observable<Venta[]>{
    return this.http.get<Venta[]>(this.vagl.ip + "ventasRealizadas/" + idUsuario);
  }

  getVentasEnPublicacion(idUsuario: number): Observable<Venta[]>{
    return this.http.get<Venta[]>(this.vagl.ip + "ventasEnPublicacion/" + idUsuario);
  }
}
