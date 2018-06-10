import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomeProvider } from "../../providers/home/home";
import { Venta } from "../../entity/Venta";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { DetalleVentaPage } from "../../pages/detalle-venta/detalle-venta";

@IonicPage()
@Component({
  selector: "page-resultado-buscador",
  templateUrl: "resultado-buscador.html"
})
export class ResultadoBuscadorPage {
  busqueda: string;
  ventas: Venta[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public homeProvider: HomeProvider,
    public sanitizer: DomSanitizer
  ) {
    this.busqueda = this.navParams.get("query");
    this.getVentasFiltradas();
    console.log(this.busqueda)
  }

  goDetalleVenta(id: number) {
    this.navCtrl.push(DetalleVentaPage, { id: id, disabled: "true"});
  }

  getVentasFiltradas() {
    this.homeProvider.getVentasFiltradas(this.busqueda).subscribe(
      data => {
        this.ventas = data;
        // for (let i in this.ventas) {
        //   this.homeProvider.getStringFoto(this.ventas[i].idProducto).subscribe(
        //     data => {
        //       // this.ventas[i].fotoPath = data;
        //       let path = data["foto"];
        //       console.log("path: " + path);
        //       this.homeProvider.getFoto(path).subscribe(
        //         data => {
        //           let sanitized = this.sanitizer.bypassSecurityTrustUrl(data);
        //           this.ventas[i].foto = sanitized;
        //         },
        //         (error: any) => {
        //           console.log(error);
        //         }
        //       );
        //     },
        //     (error: any) => {
        //       console.log(error);
        //     }
        //   );
        // }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
