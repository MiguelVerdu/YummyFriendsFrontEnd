import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CiudadProvider } from "../../providers/ciudad/ciudad";
import { Ciudad } from "../../entity/Ciudad";
import { LoginPage } from "../login/login";
import { Venta } from "../../entity/Venta";
import { VentaProvider } from "../../providers/venta/venta";
import { HomeProvider } from "../../providers/home/home";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DetalleVentaPage } from "../../pages/detalle-venta/detalle-venta";
import { ResultadoBuscadorPage } from "../resultado-buscador/resultado-buscador";
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  ventas: Venta[];
  private _result: BehaviorSubject<any> = new BehaviorSubject(null);
  private result: Observable<any> = this._result.asObservable();
  searchString: string;
  urlFoto: string;
  idUsuario: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CiudadProvider: CiudadProvider,
    public ventaProvider: VentaProvider,
    public homeProvider: HomeProvider,
    public sanitizer: DomSanitizer,
    public vagl: VariablesGlobalesProvider
  ) {
    this.getVentas();
    this.urlFoto = this.vagl.ip + "fotoVenta/";
    this.idUsuario = this.navParams.get("idUsuario");
    console.log(this.idUsuario)
  }

  ionViewDidLoad(){
  }

  goDetalleVenta(id:number) {
    this.navCtrl.push(DetalleVentaPage, {id: id, disabled: "true", idUsuario: this.idUsuario});
  }

  goResBuscador(){
    this.navCtrl.push(ResultadoBuscadorPage, {query: this.searchString});
  }

  getVentas() {
    this.homeProvider.getVentas().subscribe(
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
  cerrarSesion() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  onInput(evento: any) {
    this.searchString = evento.target.value;
  }

  onCancel(evento) {}
}
