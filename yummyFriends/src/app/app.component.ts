import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { LoginPage } from "../pages/login/login";
import { RegistroPage } from "../pages/registro/registro";
import { PerfilUsuarioPage } from "../pages/perfil-usuario/perfil-usuario";
import { ListadoVentasPage } from "../pages/listado-ventas/listado-ventas";
import { ListadoComprasPage } from "../pages/listado-compras/listado-compras";
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: "Perfil", component: PerfilUsuarioPage },
      { title: "Listado Ventas", component: ListadoVentasPage }, //solo vendedor
      { title: "Compras Realizadas", component: ListadoComprasPage },
      { title: "Encargos", component: ListadoComprasPage },
      // { title: 'Carrito', component: null} ,
      { title: "About us", component: AboutPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let idUsuario;
    if (
      typeof this.nav.getActive().getNavParams().data["idUsuario"] !=
      "undefined"
    ) {
      idUsuario = this.nav.getActive().getNavParams().data["idUsuario"];
    }
    if (page.title == "Compras Realizadas") {
      this.nav.push(page.component, { idUsuario: idUsuario, from: 'compras'});
    } else if (page.title == "Encargos") {
      this.nav.push(page.component, { idUsuario: idUsuario, from: 'encargos' });
    } else {
      this.nav.push(page.component, { idUsuario: idUsuario });
    }
  }
}
