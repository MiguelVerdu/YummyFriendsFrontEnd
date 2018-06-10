import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Venta } from "../../entity/Venta";
import { VentaProvider } from "../../providers/venta/venta";
import { HomeProvider } from "../../providers/home/home";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormGroup } from "@angular/forms";
import { Usuario } from "../../entity/Usuario";
import { DatePipe } from "@angular/common";

@IonicPage()
@Component({
  selector: "page-detalle-venta",
  templateUrl: "detalle-venta.html"
})
export class DetalleVentaPage {
  venta: Venta = new Venta();
  idVenta: number;
  nombreUsuario: string;
  date: string;
  disabled: string = "false";
  horario: string;
  textoBoton: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ventaProvider: VentaProvider,
    public homeProvider: HomeProvider,
    public sanitizer: DomSanitizer,
    public datePipe: DatePipe
  ) {
    this.idVenta = this.navParams.get("id");
    if (typeof this.navParams.get("disabled") != "undefined") {
      this.disabled = "true";
      this.textoBoton = "Añadir a Carrito";
    } else if (typeof this.navParams.get("editar") != "undefined"){
      this.textoBoton = "editar venta";
    } else if (typeof this.navParams.get("crear") != "undefined"){
      this.textoBoton = "Crear venta;"
    }
    console.log("disabled: " + this.disabled)
    console.log(this.idVenta);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetalleVentaPage");

    this.ventaProvider.getVenta(this.idVenta).subscribe(
      data => {
        this.venta = data;
        // console.log(data)
        console.log(this.venta);
        this.date = this.datePipe.transform(
          this.venta.fechaCreacion,
          "dd-MM-yyyy"
        );
        console.log("date: " + this.date)

        this.horario = this.datePipe.transform(
          this.venta.rangoHoraDisponibleMin,
          "HH:mm"
        );

        this.homeProvider.getStringFoto(this.venta.idProducto).subscribe(
          data => {
            // this.ventas[i].fotoPath = data;
            let path = data["foto"];
            console.log("path: " + path);
            this.homeProvider.getFoto(path).subscribe(
              data => {
                let sanitized = this.sanitizer.bypassSecurityTrustUrl(data);

                this.venta.foto = sanitized;
              },
              (error: any) => {
                console.log(error);
              }
            );
          },
          (error: any) => {
            console.log(error);
          }
        );
        this.ventaProvider.getVendedor(this.venta.idVenta).subscribe(
          data => {
            this.nombreUsuario = data["vendedor"];
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.venta.fechaCreacion);
  }

  anyadirAcarrito() {}
}
