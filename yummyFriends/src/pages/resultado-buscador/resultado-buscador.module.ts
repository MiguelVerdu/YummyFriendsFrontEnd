import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoBuscadorPage } from './resultado-buscador';

@NgModule({
  declarations: [
    ResultadoBuscadorPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadoBuscadorPage),
  ],
})
export class ResultadoBuscadorPageModule {}
