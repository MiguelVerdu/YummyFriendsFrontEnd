import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoVentasPage } from './listado-ventas';

@NgModule({
  declarations: [
    ListadoVentasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoVentasPage),
  ],
})
export class ListadoVentasPageModule {}
