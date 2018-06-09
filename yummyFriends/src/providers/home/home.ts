import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { VariablesGlobalesProvider } from "../variables-globales/variables-globales";
import { Venta } from "../../entity/Venta";
import { Subscriber } from "rxjs/Subscriber";

@Injectable()
export class HomeProvider {
  constructor(public http: HttpClient, public vagl: VariablesGlobalesProvider) {
    console.log("Hello HomeProvider Provider");
  }

  getVentasFiltradas(busqueda: string): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.vagl.ip + "filtrarVentas/" + busqueda);
  }

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.vagl.ip + "ventasHome");
  }

  getStringFoto(id: number): Observable<string> {
    return this.http.get<string>(this.vagl.ip + "fotoProducto/" + id);
  }

  getFoto(uuid: string): Observable<any> {
    let headers = new HttpHeaders();
    return new Observable((observer: Subscriber<any>) => {
      let objectUrl: string = null;

      this.http
        .get(this.vagl.ip + "recogerProducto/" + uuid, {
          headers: headers,
          responseType: "blob"
        })
        .subscribe(m => {
          objectUrl = URL.createObjectURL(m);
          observer.next(objectUrl);
        });

      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
      };
    });

    // return this.http.get(this.vagl.ip + "recogerProducto/" + uuid, {
    //   headers: headers,
    //   responseType: "blob"
    // });
  }
}
