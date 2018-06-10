import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Venta } from "../../entity/Venta";
import { VentaProvider } from "../../providers/venta/venta";
import { HomeProvider } from "../../providers/home/home";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../entity/Usuario";
import { DatePipe } from "@angular/common";
import { DetalleVentaProvider } from "../../providers/detalle-venta/detalle-venta";
import { Producto } from "../../entity/producto";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ventaProvider: VentaProvider,
    public homeProvider: HomeProvider,
    public sanitizer: DomSanitizer,
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public detalleVentaProv: DetalleVentaProvider
  ) {
    this.idVenta = this.navParams.get("id");
    if (typeof this.navParams.get("disabled") != "undefined") {
      this.disabled = "true";
      this.textoBoton = "Añadir a Carrito";
      this.titulo = "Detalle Venta";
      this.mostrar = false;
    } else if (typeof this.navParams.get("editar") != "undefined") {
      this.textoBoton = "editar venta";
      this.titulo = "Editar Venta";
    } else if (typeof this.navParams.get("crear") != "undefined") {
      this.mostrarFoto = false;
      this.textoBoton = "Crear venta";
      this.titulo = "Crear Venta";
    }
    this.myForm = this.createMyForm();
    console.log("disabled: " + this.disabled + ", mostrar: " + this.mostrar);
    console.log(this.idVenta);
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
          console.log("date: " + this.date);

          this.horario = this.datePipe.transform(
            this.venta.rangoHoraDisponibleMin,
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
    if (typeof this.venta == "undefined") {
      this.venta = new Venta();
      this.venta.foto = files.item(0);
    }
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

  gestionar() {
    if (this.titulo == "Detalle Venta") {
      // anyadir a carrito
    } else if (this.titulo == "Editar Venta") {
      //llamar al provider y actualizar datos, comprobar si la foto es != null
    } else if (this.titulo == "Crear Venta") {
      //llamar al provider y actualizar datos, comprobar su la foto es != null
      console.log(this.myForm.value);
      let venta: Venta = new Venta();
      let datos = this.myForm.value;
      venta.titulo = datos.titulo;
      venta.fechaCreacion = datos.fechaAlta;
      venta.rangoHoraDisponibleMin = datos.horario;
      venta.rangoHorarioDisponibleMax = datos.horario;
      venta.cantidad = datos.cantidad;
      venta.precio = datos.precio;
      venta.descripcion = datos.descripcion;

      let producto: Producto = new Producto();
      producto.descripcion = venta.descripcion;
      producto.nombre = venta.titulo;

      this.detalleVentaProv.crearVenta(venta).subscribe(
        data => {
          //llamada insertar producto
          this.detalleVentaProv.crearProducto(producto).subscribe(
            data => {

            }, error => {
              console.log(error);
            }
          )
          // let producto = data["idProducto"];
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
