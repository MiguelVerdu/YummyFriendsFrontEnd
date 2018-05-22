import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecuperarPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-pass',
  templateUrl: 'recuperar-pass.html',
})
export class RecuperarPassPage {
  tam: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
