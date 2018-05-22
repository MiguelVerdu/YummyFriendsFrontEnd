import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecuperarPassProvider } from '../../providers/recuperar-pass/recuperar-pass';
import { CiudadProvider } from '../../providers/ciudad/ciudad';

@Component({
  selector: 'page-recuperar-pass',
  templateUrl: 'recuperar-pass.html',
})
export class RecuperarPassPage {
  tam: number;
  email: string = "";

  constructor(public CiudadProvider: CiudadProvider, public navCtrl: NavController, public navParams: NavParams, public recPassProv: RecuperarPassProvider) {
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
        console.log(data);
      },
        (error: any) => {
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
