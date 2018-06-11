import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import { Compra } from "../../entity/compra";
import { ListadoComprasProvider } from "../../providers/listado-compras/listado-compras";
import { VentaProvider } from "../../providers/venta/venta";
import { Venta } from "../../entity/Venta";

@IonicPage()
@Component({
  selector: "page-listado-compras",
  templateUrl: "listado-compras.html"
})
export class ListadoComprasPage {
  compras: Compra[];
  comprasRealizadas: Compra[];
  encargos: Compra[];
  encargo: boolean = false;
  titulo: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public compraProv: ListadoComprasProvider,
    public ventaProv: VentaProvider,
    public alertCtrl: AlertController
  ) {
    setTimeout(() => {
      /*Your Code*/
    }, 1000);
    this.delay(1000);
    let from = this.navParams.get("from");
    if (from == "compras") {
      this.encargo = false;
      this.getComprasRealizadas("finalizada");
      this.titulo = "Compras realizadas";
    } else {
      this.encargo = true;
      this.getEncargos("pendiente");
      this.titulo = "Encargos";
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListadoComprasPage");
  }

  actualizarCompra(id: number) {
    let alert = this.alertCtrl.create({
      title: "Finalizar encargo",
      message: "¿Deseas finalizar este encargo?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Aceptar",
          handler: () => {
            this.compraProv.actualizarCompra(id).subscribe(
              data => {
                this.navCtrl.popToRoot();
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getComprasRealizadas(tipo: string) {
    this.compraProv.getCompras(tipo).subscribe(
      data => {
        this.comprasRealizadas = data;
        for (let i in this.comprasRealizadas) {
          console.log(this.comprasRealizadas[i].idCompra);
          this.compraProv
            .getVenta(this.comprasRealizadas[i].idCompra)
            .subscribe(
              data => {
                this.comprasRealizadas[i].venta = data;
                this.comprasRealizadas[i].precio = data["precio"];
                this.comprasRealizadas[i].idProducto = data["idProducto"];
                this.comprasRealizadas[i].titulo = data["titulo"];
                console.log(data);
              },
              error => {
                console.log(error);
              }
            );
        }
        this.compras = this.comprasRealizadas;
      },
      error => {
        console.log(error);
      }
    );
  }

  getEncargos(tipo: string) {
    this.compraProv.getCompras(tipo).subscribe(
      data => {
        this.encargos = data;
        for (let i in this.encargos) {
          this.compraProv.getVenta(this.encargos[i].idCompra).subscribe(
            data => {
              // this.encargos[i].venta = data;
              this.encargos[i].precio = data["precio"];
              this.encargos[i].idProducto = data["idProducto"];
              this.encargos[i].titulo = data["titulo"];
              console.log(data)
            },
            error => {
              console.log(error);
            }
          );
        }
        this.compras = this.encargos;
      },
      error => {
        console.log(error);
      }
    );
  }
}
