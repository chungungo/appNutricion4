import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public navController: NavController) {}

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
