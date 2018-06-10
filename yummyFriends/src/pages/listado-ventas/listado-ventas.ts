import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { VentaProvider } from "../../providers/venta/venta";
import { Venta } from "../../entity/Venta";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ventaProvider: VentaProvider
  ) {
    this.idUsuario = this.navParams.get("idUsuario");
    console.log(this.idUsuario)
    this.getVentasRealizadas();
    this.getVentasEnPublicacion();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListadoVentasPage");
  }

  getVentasRealizadas(){
    console.log("getVentasRealizadas, idusuario: " + this.idUsuario);
    this.ventaProvider.getVentasRealizadas(this.idUsuario).subscribe(
      data=> {
        this.ventasRealizadas = data;
        this.ventas = data;
        console.log(data)
      }, (error) => {
        console.log(error);
      }
    );
  }

  change(evento){
    console.log(evento);
    if (evento == "realizadas") {
      this.ventas = this.ventasRealizadas;
    } else if (evento == "publicacion") {
      this.ventas = this.ventasEnPublicacion;
    }
  }

  getVentasEnPublicacion(){
    this.ventaProvider.getVentasEnPublicacion(this.idUsuario).subscribe(
      data=> {
        this.ventasEnPublicacion = data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  goDetalleVenta(idVenta: number){

  }
}
