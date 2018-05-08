import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CiudadProvider } from '../../providers/ciudad/ciudad';
import { Ciudad } from '../../entity/Ciudad';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ciudades: Ciudad[];
  constructor(public navCtrl: NavController, public CiudadProvider: CiudadProvider) {

  }

  ngOnInit(){
    this.CiudadProvider.getCiudades().subscribe((data) => {
      debugger
      this.ciudades = data;
    },
    (error: any) => {
        console.log(error);
    });
  }

}
