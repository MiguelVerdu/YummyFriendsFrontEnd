import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from '../../entity/Ciudad';
import { CiudadProvider } from '../../providers/ciudad/ciudad';
import { RegistroProvider } from '../../providers/registro/registro';
import { Usuario } from '../../entity/Usuario';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  myForm: FormGroup;
  ciudades: Ciudad[];
  selectOptions: any;
  contador: number = 0;
  visible: boolean = false;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public ciudadProvider: CiudadProvider,
    public toastController: ToastController,
    public alertController: AlertController,
    public registroProvider: RegistroProvider
  ) {
    this.selectOptions = {
      title: "Ciudad",
      mode: 'md'
    };
    this.myForm = this.createMyForm();
  }

  ngOnInit() {
    this.ciudadProvider.getCiudades().subscribe((data) => {
      this.ciudades = data;
    },
      (error: any) => {
        console.log(error);
      });
    let alert = this.alertController.create({
      title: "AVISO",
      message: "la contraseña debe tener entre 8 y 16 caracteres, debe contener: números, una minúscula, una mayúscula y un carácter especial",
      buttons: ['OK']
    });
    alert.present();
  }

  saveData() {
    console.log(this.myForm.value);
    let form = this.myForm.value;
    if (form.passwordRetry.password == form.passwordRetry.passwordConfirmation) {
      let usuario: Usuario = new Usuario(form.name, form.lastName, form.dateBirth,
        form.ciudad, null, form.passwordRetry.password, form.tipo, null, form.email);

      this.registroProvider.validarUsuario(form.email).subscribe((data) => {
        if (data != null) {
          usuario.idUsuario = data["idUsuario"];
          this.registroProvider.crearUsuario(usuario).subscribe((data) => {
            console.log("bien: " + data);
          }, (error) => {
            console.log(error);
          });
        } else {
          this.showError("Este email ya está asignado a un usuario de la aplicación");
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.showError("las contraseñas no coinciden");
    }
  }

  showError(text) {
    // this.loading.dismiss();
    // this.myForm.value.email = "";
    this.myForm.reset();
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  private createMyForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateBirth: ['', Validators.required],
      passwordRetry: this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)]],
        passwordConfirmation: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)]]
      }),
      tipo: ['', Validators.required],
      ciudad: ['', Validators.required],
    });
  }

}
