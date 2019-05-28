import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public navController: NavController) { }

  irATab2(){
    this.navController.navigateForward('tab2');
  }

  irATab1() {
    this.navController.navigateBack('tab1');
  }

  acercaDe() {
    this.navController.navigateBack('tab3');
  }

}
