import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { RecuperarPassPage } from '../pages/recuperar-pass/recuperar-pass';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { DetalleVentaPage } from '../pages/detalle-venta/detalle-venta';
import { ResultadoBuscadorPage } from "../pages/resultado-buscador/resultado-buscador";
import { ListadoVentasPage } from '../pages/listado-ventas/listado-ventas';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { CiudadProvider } from '../providers/ciudad/ciudad';
import { VariablesGlobalesProvider } from '../providers/variables-globales/variables-globales';
import { LoginProvider } from '../providers/login/login';
import { RecuperarPassProvider } from '../providers/recuperar-pass/recuperar-pass';
import { EmailComposer } from '@ionic-native/email-composer';
import { RegistroProvider } from '../providers/registro/registro';
import { VentaProvider } from '../providers/venta/venta';
import { PerfilUsuarioProvider } from '../providers/perfil-usuario/perfil-usuario';
import { DatePipe } from '@angular/common'
import { HomeProvider } from '../providers/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegistroPage,
    RecuperarPassPage,
    PerfilUsuarioPage,
    DetalleVentaPage,
    ResultadoBuscadorPage,
    ListadoVentasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegistroPage,
    RecuperarPassPage,
    PerfilUsuarioPage,
    DetalleVentaPage,
    ResultadoBuscadorPage,
    ListadoVentasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CiudadProvider,
    VariablesGlobalesProvider,
    LoginProvider,
    RecuperarPassProvider,
    EmailComposer,
    RegistroProvider,
    VentaProvider,
    PerfilUsuarioProvider,
    DatePipe,
    HomeProvider
  ]
})
export class AppModule {}
