import { Venta } from "./Venta";

export class Compra {
  public idCompra: number;

  public idVenta: number;
  public venta?: Venta;
  public precio?: number;
  public idProducto?:number;
  public titulo?: string;
  public idComprador: number;

  public cantidadProducto: number;

  public fechaHora: Date;
  public fecha?: string;

  public valoracion: number;

  public comentarios: String;

  public estado: String;
}
