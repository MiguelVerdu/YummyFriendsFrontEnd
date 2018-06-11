import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  Loading
} from "ionic-angular";
import { Venta } from "../../entity/Venta";
import { VentaProvider } from "../../providers/venta/venta";
import { HomeProvider } from "../../providers/home/home";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../entity/Usuario";
import { DatePipe } from "@angular/common";
import { DetalleVentaProvider } from "../../providers/detalle-venta/detalle-venta";
import { Producto } from "../../entity/producto";
import { Compra } from "../../entity/compra";

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
  mostrar: boolean = true;
  mostrarFoto: boolean = true;
  titulo: string;
  myForm: FormGroup;
  idUsuario: number;
  fileInput: File = null;
  loading: Loading;
  idUsuarioCompra: number;
  desactivarVendedor: string = "false";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ventaProvider: VentaProvider,
    public homeProvider: HomeProvider,
    public sanitizer: DomSanitizer,
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public detalleVentaProv: DetalleVentaProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.idVenta = this.navParams.get("id");
    this.idUsuario = this.navParams.get("usuario");
    this.idUsuarioCompra = this.navParams.get("idUsuario");
    console.log("venta: " + this.idVenta)
    if (typeof this.navParams.get("disabled") != "undefined") {
      this.disabled = "true";
      this.desactivarVendedor = "true";
      this.textoBoton = "Añadir a Carrito";
      this.titulo = "Detalle Venta";
      this.mostrar = false;
      this.desactivarVendedor = "true";
    } else if (typeof this.navParams.get("editar") != "undefined") {
      this.textoBoton = "editar venta";
      this.titulo = "Editar Venta";
      this.desactivarVendedor = "true";
    } else if (typeof this.navParams.get("crear") != "undefined") {
      this.mostrarFoto = false;
      this.textoBoton = "Crear venta";
      this.titulo = "Crear Venta";
    }
    this.myForm = this.createMyForm();
    console.log("disabled: " + this.disabled + ", mostrar: " + this.mostrar);
    console.log(this.idVenta);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "Compra realizada!",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetalleVentaPage");
    if (typeof this.idVenta != "undefined") {
      this.ventaProvider.getVenta(this.idVenta).subscribe(
        data => {
          this.venta = data;
          // console.log(data)
          console.log(this.venta);

          this.date = this.datePipe.transform(
            this.venta.fechaCreacion,
            "dd-MM-yyyy"
          );
          let partes = this.date.split("-");

          let fechaaux = new Date(
            Number.parseInt(partes[2]),
            Number.parseInt(partes[1]) - 2,
            Number.parseInt(partes[0])
          );
          this.date = this.datePipe.transform(fechaaux, "dd-MM-yyyy");
          console.log("date: " + this.date);

          this.horario = this.datePipe.transform(
            this.venta.rangoHoraDisponibleMin,
            "HH:mm"
          );
          this.horario += " - ";
          this.horario += this.datePipe.transform(
            this.venta.rangoHorarioDisponibleMax,
            "HH:mm"
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
  }

  handleFileInput(files: FileList) {
    this.fileInput = files.item(0);
  }

  private createMyForm() {
    return this.formBuilder.group({
      titulo: ["", Validators.required],
      fechaAlta: ["", Validators.required],
      horario: ["", Validators.required],
      cantidad: ["", Validators.required],
      precio: ["", Validators.required],
      descripcion: ["", Validators.required]
    });
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: "Cantidad producto",
      inputs: [
        {
          name: "cantidad",
          placeholder: "Introduce la cantidad",
          type: "number"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Comprar",
          handler: data => {
            console.log("ventaEnviar: " + this.navParams.get("id") + ", " + this.navParams.get("idUsuario"))
            let compra: Compra = new Compra();
            compra.idVenta = this.navParams.get("id");
            compra.comentarios = this.idUsuarioCompra + "-" + this.idVenta ;
            compra.idComprador = this.navParams.get("idUsuario");
            compra.fechaHora = new Date();
            compra.estado = "pendiente";
            compra.cantidadProducto = Number.parseInt(data["cantidad"]);
            console.log(compra);
            this.detalleVentaProv.anyadirAcarrito(compra).subscribe(
              data => {
                if (data != null) {
                  this.showLoading();
                  setTimeout(() => {
                    this.navCtrl.popToRoot();
                  }, 1000);
                }
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

  gestionar() {
    if (this.titulo == "Detalle Venta") {
      // anyadir a carrito
      this.presentPrompt();
    } else if (this.titulo == "Crear Venta" || this.titulo == "Editar Venta") {
      //llamar al provider y actualizar datos, comprobar su la foto es != null
      console.log(this.myForm.value);
      let venta: Venta =
        typeof this.venta.idVenta != "undefined" ? this.venta : new Venta();
      // venta.idVenta = typeof this.idVenta != "undefined" ? this.idVenta : null;
      console.log("id:" + venta.idVenta);
      let datos = this.myForm.value;
      venta.titulo = datos.titulo;
      let fechaCreacion = datos.fechaAlta.split("/");
      fechaCreacion =
        fechaCreacion.length != 3 ? datos.fechaAlta.split("-") : fechaCreacion;
      let fecha = new Date(
        fechaCreacion[2],
        fechaCreacion[1],
        fechaCreacion[0]
      );
      venta.fechaCreacion = fecha;
      let rangos = datos.horario.split("-");
      let rangoInicial = rangos[0].split(":");
      // year: number, month: number, date?: number, hours?: number, minutes?: number,
      fecha = new Date(
        fechaCreacion[2],
        fechaCreacion[1] - 1,
        fechaCreacion[0],
        rangoInicial[0],
        rangoInicial[1]
      );
      // fecha.setHours(Number.parseInt(rangoInicial[0]));
      // fecha.setMinutes(Number.parseInt(rangoInicial[1]));
      venta.rangoHoraDisponibleMin = fecha;

      let rangoFinal = rangos[1].split(":");
      fecha = new Date(
        fechaCreacion[2],
        fechaCreacion[1] - 1,
        fechaCreacion[0],
        rangoFinal[0],
        rangoFinal[1]
      );
      // fecha.setHours(Number.parseInt(rangoFinal[0]));
      // fecha.setMinutes(Number.parseInt(rangoFinal[1]));

      venta.rangoHorarioDisponibleMax = fecha;
      venta.cantidad = datos.cantidad;
      venta.precio = datos.precio;
      venta.descripcion = datos.descripcion;
      venta.idVendedor = this.idUsuario;

      let producto: Producto = new Producto();
      producto.descripcion = venta.descripcion;
      producto.nombre = venta.titulo;
      // producto.idProducto generar idProducto
      producto.idUsuario = this.idUsuario;
      console.log("id" + this.idUsuario);
      this.detalleVentaProv.crearVenta(venta).subscribe(
        dataVenta => {
          console.log(dataVenta);
          if (this.fileInput != null) {
            //llamada insertar producto
            this.detalleVentaProv.getMaxId().subscribe(
              data => {
                producto.idProducto = data;

                this.detalleVentaProv
                  .guardarFoto(producto, this.fileInput, dataVenta["idVenta"])
                  .subscribe(
                    data => {},
                    error => {
                      console.log(error);
                    }
                  );
              },
              error => {
                console.log();
              }
            );
          }
          this.navCtrl.popToRoot();
          // let producto = data["idProducto"];
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
