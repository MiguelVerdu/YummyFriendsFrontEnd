import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoComprasPage } from './listado-compras';

@NgModule({
  declarations: [
    ListadoComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoComprasPage),
  ],
})
export class ListadoComprasPageModule {}
