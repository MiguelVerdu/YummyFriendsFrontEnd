import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleVentaPage } from './detalle-venta';

@NgModule({
  declarations: [
    DetalleVentaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleVentaPage),
  ],
})
export class DetalleVentaPageModule {}
