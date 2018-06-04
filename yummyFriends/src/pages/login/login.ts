import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RecuperarPassPage } from '../recuperar-pass/recuperar-pass'
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  myform: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, public formBuilder: FormBuilder
    , private loginProvider: LoginProvider) {
    // this.myform = this.createMyForm();
    this.myform = this.formBuilder.group({
      email: ['miguelverdu1812@gmail.com', [Validators.required, Validators.email]],
      password: ['18121996@Miguel', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)]],
    });
  }

  prueba() {
    console.log(this.myform.value);
    this.loginProvider.comprobarLogin(this.myform.value.password, this.myform.value.email).subscribe((data) => {
      console.log(data)
    },
    (error: any) => {
      console.log(error);
    });
  }

  login() {
    this.myform.value;
    if (this.myform.valid) {
      console.log("Form Submitted!");
      this.loginProvider.comprobarLogin(this.myform.value.password, this.myform.value.email).subscribe((data) => {
        if (data != null) {
          // console.log(data["idUsuario"]);
          this.showLoading();
          setTimeout(() => {
            // this.navCtrl.push(HomePage);
            this.navCtrl.setRoot(HomePage, {idUsuario: data["idUsuario"]});
          }, 1000);
        } else {
          this.showError("usuario o contraseña incorrectos");
        }
      },
      (error: any) => {
        console.log(error);
      });
      // this.myform.reset();
      // this.loginProvider.comprobarLogin(this.myform.)
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    // this.loading.dismiss();
    this.myform.reset();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  recuperarPass() {
    this.navCtrl.push(RecuperarPassPage);
  }

  registrarse() {
    this.navCtrl.push(RegistroPage);
  }

}
