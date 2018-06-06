import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { RecuperarPassProvider } from "../../providers/recuperar-pass/recuperar-pass";
import { CiudadProvider } from "../../providers/ciudad/ciudad";
import { EmailComposer } from "@ionic-native/email-composer";

@Component({
  selector: "page-recuperar-pass",
  templateUrl: "recuperar-pass.html"
})
export class RecuperarPassPage {
  tam: number;
  email: string = "";

  constructor(
    public CiudadProvider: CiudadProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public recPassProv: RecuperarPassProvider,
    public emailComposer: EmailComposer,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.CiudadProvider.getCiudades().subscribe(
      data => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );

    // this.recPassProv.getUsuarios().subscribe((data) => {
    //   console.log(data)
    // },
    //   (error: any) => {
    //     console.log(error);
    //   });
  }

  crearAlert(tipo: string) {
    let titulo: string;
    let subtitulo: string;

    if (tipo == "ok") {
      titulo = "Email enviado";
      subtitulo = "Te hemos enviado un email con la nueva contraseña";
    } else {
      titulo = "Error!";
      subtitulo = "Este email no pertenece a ningún usuario";
    }

    let alert = this.alertController.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            // alert.dismiss().then(() => {
            if (tipo == "ok") {
              this.navCtrl.pop();
            }
            // });
          }
        }
      ]
    });
    alert.present();
  }

  recuperarPass() {
    if (this.email.trim().length > 0) {
      console.log(this.email);
      this.recPassProv.recuperarPass(this.email).subscribe(
        data => {
          if (data != null) {
            console.log("Te hemos mandado un email con tu nueva contraseña");
            this.recPassProv.enviarEmail(this.email).subscribe(
              data => {
                this.crearAlert("ok");
              },
              (error: any) => {
                console.log("error");
                console.log(error);
              }
            );
          } else {
            console.log("Este email no pertenece a ningún usuario.");
            this.crearAlert("error");
          }
        },
        (error: any) => {
          console.log("error");
          console.log(error);
        }
      );
    } else {
      this.email = "";
      alert("el campo email debe estar relleno");
    }
  }

  generarPass(tam) {
    let longitud: number = parseInt(tam);

    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ12346789";
    var contraseña = "";
    for (var i = 0; i < longitud; i++) {
      contraseña += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
  }
}
