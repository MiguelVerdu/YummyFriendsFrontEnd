import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { VentaProvider } from "../../providers/venta/venta";
import { Venta } from "../../entity/Venta";
import { HomeProvider } from "../../providers/home/home";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { DetalleVentaPage } from "../detalle-venta/detalle-venta";

@IonicPage()
@Component({
  selector: "page-listado-ventas",
  templateUrl: "listado-ventas.html"
})
export class ListadoVentasPage {
  idUsuario: number;
  ventasRealizadas: Venta[];
  ventasEnPublicacion: Venta[];
  ventas: Venta[];
  realizadas: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ventaProvider: VentaProvider,
    public homeProvider: HomeProvider,
    public sanitizer: DomSanitizer
  ) {
    this.idUsuario = this.navParams.get("idUsuario");
    console.log(this.idUsuario)
    this.getVentasRealizadas();
    this.getVentasEnPublicacion();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListadoVentasPage");
  }

  getVentasRealizadas() {
    this.ventaProvider.getVentasRealizadas(this.idUsuario).subscribe(
      data => {
        this.ventasRealizadas = data;
        for (let i in this.ventasRealizadas) {
          // this.homeProvider
          //   .getStringFoto(this.ventasRealizadas[i].idProducto)
          //   .subscribe(
          //     data => {
          //       // this.ventas[i].fotoPath = data;
          //       let path = data["foto"];
          //       console.log("path: " + path);
          //       this.homeProvider.getFoto(path).subscribe(
          //         data => {
          //           let sanitized = this.sanitizer.bypassSecurityTrustUrl(data);

          //           this.ventasRealizadas[i].foto = sanitized;
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
          this.ventaProvider
            .getTotalVenta(this.ventasRealizadas[i].idVenta)
            .subscribe(
              data => {
                console.log("precio: " + data);
                this.ventasRealizadas[i].precio = data;
              },
              error => {
                console.log(error);
              }
            );
        }
        this.ventas = this.ventasRealizadas;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getVentasEnPublicacion() {
    this.ventaProvider.getVentasEnPublicacion(this.idUsuario).subscribe(
      data => {
        this.ventasEnPublicacion = data;
        // for (let i in this.ventasEnPublicacion) {
        //   this.homeProvider
        //     .getStringFoto(this.ventasEnPublicacion[i].idProducto)
        //     .subscribe(
        //       data => {
        //         // this.ventas[i].fotoPath = data;
        //         let path = data["foto"];
        //         console.log("path: " + path);
        //         this.homeProvider.getFoto(path).subscribe(
        //           data => {
        //             let sanitized = this.sanitizer.bypassSecurityTrustUrl(data);

        //             this.ventasEnPublicacion[i].foto = sanitized;
        //           },
        //           (error: any) => {
        //             console.log(error);
        //           }
        //         );
        //       },
        //       (error: any) => {
        //         console.log(error);
        //       }
        //     );
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  change(evento) {
    console.log(evento);
    if (evento == "realizadas") {
      this.ventas = this.ventasRealizadas;
      this.realizadas = true;
    } else if (evento == "publicacion") {
      this.ventas = this.ventasEnPublicacion;
      this.realizadas = false;
    }
  }

  goDetalleVenta(idVenta: number) {
    this.navCtrl.push(DetalleVentaPage, { id: idVenta, editar: "editar", usuario: this.idUsuario});
  }

  crearVenta(){
    this.navCtrl.push(DetalleVentaPage, { crear: "crear", usuario: this.idUsuario});
  }
}
