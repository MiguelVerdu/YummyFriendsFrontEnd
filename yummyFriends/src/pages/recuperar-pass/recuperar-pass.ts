import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecuperarPassProvider } from '../../providers/recuperar-pass/recuperar-pass';
import { CiudadProvider } from '../../providers/ciudad/ciudad';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-recuperar-pass',
  templateUrl: 'recuperar-pass.html',
})
export class RecuperarPassPage {
  tam: number;
  email: string = "";

  constructor(public CiudadProvider: CiudadProvider, public navCtrl: NavController, public navParams: NavParams,
                public recPassProv: RecuperarPassProvider, public emailComposer: EmailComposer) {
  }

  ngOnInit() {
    this.CiudadProvider.getCiudades().subscribe((data) => {
      console.log(data)
    },
      (error: any) => {
        console.log(error);
      });

    this.recPassProv.getUsuarios().subscribe((data) => {
      console.log(data)
    },
      (error: any) => {
        console.log(error);
      });
  }

  recuperarPass() {
    if (this.email.trim().length > 0) {
      console.log(this.email);
      this.recPassProv.recuperarPass(this.email).subscribe((data) => {
        if (data != null) {
          console.log("Te hemos mandado un email con tu nueva contraseña");
          this.emailComposer.isAvailable().then((available: boolean) =>{
            console.log("available:" + available)
            if(available) {
              //Now we know we can send
              let email = {
                to: this.email,
                // cc: 'erika@mustermann.de',
                // bcc: ['john@doe.com', 'jane@doe.com'],
                // attachments: [
                //   'file://img/logo.png',
                //   'res://icon.png',
                //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
                //   'file://README.pdf'
                // ],
                subject: 'Solicitud de nueva contraseña',
                body: 'Te remitimos tu nueva contraseña: ' + this.generarPass(8)
                // , isHtml: true
              };
              console.log(this.emailComposer.hasPermission);
              this.emailComposer.open(email);
            }
           });
        } else {
          console.log("Este email no pertenece a ningún usuario.");
        }
      },
        (error: any) => {
          console.log("error")
          console.log(error);
        });
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
      contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
  }
}
