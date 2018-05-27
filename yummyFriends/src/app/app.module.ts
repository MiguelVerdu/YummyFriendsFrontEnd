import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { RecuperarPassPage } from '../pages/recuperar-pass/recuperar-pass';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { CiudadProvider } from '../providers/ciudad/ciudad';
import { VariablesGlobalesProvider } from '../providers/variables-globales/variables-globales';
import { LoginProvider } from '../providers/login/login';
import { RecuperarPassProvider } from '../providers/recuperar-pass/recuperar-pass';
import { EmailComposer } from '@ionic-native/email-composer';
import { RegistroProvider } from '../providers/registro/registro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegistroPage,
    RecuperarPassPage
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
    RecuperarPassPage
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
    RegistroProvider
  ]
})
export class AppModule {}
