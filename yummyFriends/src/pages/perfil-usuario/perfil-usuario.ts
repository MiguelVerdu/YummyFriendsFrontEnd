import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  Loading
} from "ionic-angular";
import { Usuario } from "../../entity/Usuario";
import { PerfilUsuarioProvider } from "../../providers/perfil-usuario/perfil-usuario";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CiudadProvider } from "../../providers/ciudad/ciudad";
import { Ciudad } from "../../entity/Ciudad";
import { DatePipe } from "@angular/common";
import {Md5} from 'ts-md5/dist/md5';

@IonicPage()
@Component({
  selector: "page-perfil-usuario",
  templateUrl: "perfil-usuario.html"
})
export class PerfilUsuarioPage {
  usuario: Usuario = new Usuario(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  myform: FormGroup;
  ciudades: Ciudad[];
  // datePipe: DatePipe = new DatePipe('DD/MM/YYYY');
  date: string;
  loading: Loading;
  md5: Md5 = new Md5();
  comentarios: String;
  valoracion: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public PerfilUsuario: PerfilUsuarioProvider,
    public formBuilder: FormBuilder,
    public ciudadProv: CiudadProvider,
    public datepipe: DatePipe,
    public alertController: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.usuario.idUsuario = this.navParams.get("idUsuario");
    this.myform = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log("idUsuario: " + this.usuario.idUsuario);
    this.PerfilUsuario.getUsuario(this.usuario.idUsuario).subscribe(
      data => {
        this.usuario = data;
        console.log(this.usuario.fechaNac);
        // let fecha = this.usuario.fechaNac;
        // let aux = fecha.getUTCDate + "/" + fecha.getUTCMonth + "/" + fecha.getUTCFullYear;
        // this.date = new Date();
        this.date = this.datepipe.transform(
          this.usuario.fechaNac,
          "dd-MM-yyyy"
        );
        console.log("aux: " + this.date);

        let aux = new Date(
          this.date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
        );
        aux.setDate(aux.getDate() + 1);

        console.log("aux: " + aux);
        this.date = aux.toISOString();
        // console.log("aux"  + aux + ", " + this.date);
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.ciudadProv.getCiudades().subscribe(
      data => {
        this.ciudades = data;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.PerfilUsuario.obtenerComentarios(this.usuario.idUsuario).subscribe(
      data => {
        this.comentarios = data;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.PerfilUsuario.obtenerValoracion(this.usuario.idUsuario).subscribe(
      data => {
        this.valoracion = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  actualizar() {
    console.log(this.myform.value);
    let form = this.myform.value;
    if (form.password != "") {
      let usuario: Usuario = new Usuario(
        form.name,
        form.lastName,
        form.dateBirth,
        form.ciudad,
        null,
        form.password,
        form.tipo,
        null,
        form.email,
        this.usuario.idUsuario
      );
      let pass = this.md5.appendStr(usuario.password.toString());
      usuario.password = pass.end().toString();

      this.PerfilUsuario.actualizarUsuario(usuario).subscribe(
        data => {
          if (data != null) {
            console.log("bien: " + data);
            this.showLoading();
            setTimeout(() => {
              this.navCtrl.pop();
              // this.navCtrl.setRoot(HomePage, {idUsuario: data["idUsuario"]});
            }, 500);
          }
        },
        error => {
          console.log(error);
        }
      );

      // this.registroProvider.validarUsuario(form.email).subscribe((data) => {
      //   if (data != null) {
      //     usuario.idUsuario = data["idUsuario"];
      //     this.registroProvider.crearUsuario(usuario).subscribe((data) => {
      //       console.log("bien: " + data);
      //     }, (error) => {
      //       console.log(error);
      //     });
      //   } else {
      //     this.showError("Este email ya está asignado a un usuario de la aplicación");
      //   }
      // }, (error) => {
      //   console.log(error);
      // });
    } else {
      this.showError("el campo contraseña debe tener valor");
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "Datos actualizados!",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    // this.loading.dismiss();
    // this.myForm.value.email = "";
    this.myform.reset();
    let alert = this.alertController.create({
      title: "Error",
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present();
  }

  private createMyForm() {
    return this.formBuilder.group({
      name: [this.usuario.nombre, Validators.required],
      lastName: [this.usuario.apellidos, Validators.required],
      email: [this.usuario.mail, [Validators.required, Validators.email]],
      dateBirth: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
          )
        ]
      ],
      ciudad: ["", Validators.required]
    });
  }
}
