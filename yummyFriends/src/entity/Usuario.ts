import { asPureExpressionData } from "@angular/core/src/view";

export class Usuario {
  constructor(nombre, apellidos, fechaNac, idCiudad, idCodPostal, pass, tipo, foto, mail, idUsuario?) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fechaNac = fechaNac;
    this.idCiudad = idCiudad;
    this.idCodPostal = idCodPostal;
    this.password = pass;
    this.tipoPerfil = tipo;
    this.fotoPerfil = foto;
    this.mail = mail;
    this.idUsuario = idUsuario;
  }
  public idUsuario: number;

  public nombre: String;

  public apellidos: String;

  public fechaNac: Date;

  public idCiudad: number;
  public idCodPostal: number;

  public password: String;

  public tipoPerfil: String;

  public fotoPerfil: String;

  public fotoGuardar: File;

  public mail: String;
}
