import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.page.html',
  styleUrls: ['./calculos.page.scss'],
})
export class CalculosPage implements OnInit {
  constructor(
    public navController: NavController,
    public activateRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public asheetctrl: ActionSheetController
  ) {
    setTimeout(() => {
      this.cargando = true;
      this.alerta('¿Nos autorizas a recopilar estos datos?');
    }, 1900);

  }

  peso: any;
  imc: any;
  calorias: any;
  esbajo: boolean = false;
  esnormal: boolean = false;
  essobrepeso: boolean = false;
  esobesidad: boolean = false;
  verCalorias: boolean = false;
  verIMC: boolean = false;
  verPesoIdeal: boolean = false;
  cargando: boolean = false;
  evaluar: boolean = false;

  ngOnInit() {
    this.calorias = parseInt(this.activateRoute.snapshot.paramMap.get('valorCalorias'));
    this.peso = parseFloat(this.activateRoute.snapshot.paramMap.get('valorPesoIdeal')).toFixed(2);
    this.imc = parseFloat(this.activateRoute.snapshot.paramMap.get('valorIMC')).toFixed(2);

    if (this.imc > 0) {
      this. verIMC = true;
      this.evaluarIMC(this.imc);
    } else {
      this.verIMC = false;
    }

    if (this.calorias > 0) {
      this.verCalorias = true;
    } else {
      this.verCalorias = false;
    }

    if (this.peso > 0) {
      this.verPesoIdeal = true;
    } else {
      this.verPesoIdeal = false;
    }
  }

  irA(mensaje) {
    this.navController.navigateForward(mensaje);
  }

  evaluarIMC(imc: any) {
    if (imc < 18.5) {
      this.esbajo = true;
    }
    if (imc >= 18.5 && imc < 25) {
      this.esnormal = true;
    }
    if (imc >= 25 && imc < 30) {
      this.essobrepeso = true;
    }
    if (imc >= 30) {
      this.esobesidad = true;
    }
  }

  //alertas
  async alerta(mensaje) {
    const alerta = await this.alertCtrl.create({
      header: 'Mensaje',
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: (dato) => {
            setTimeout(() => {
              this.verMsg('Gracias. Tus datos son confidenciales');
            }, 900);
          }
        },
        {
          text: 'Cancelar'
        }]
    })
    alerta.present();
  }

  //mensajes
  async verMsg(mensaje) {
    const evento = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
      evento.present();
  }

  evaluarApp() {
    if (this.evaluar) {
      this.ponerNota();
    }
  }

  async ponerNota() {
    const hojaAccion = await this.asheetctrl.create({
      header: 'Opciones',
      buttons:
        [
          {
            text: '1 estrella',
            icon: 'star',
            handler: () => {
              console.log('1 estrella');
              setTimeout(() => {
                this.verMsg('Gracias por evaluar');
              }, 1000);
            }
          },
          {
            text: '2 estrellas',
            icon: 'star',
            handler: () => {
              console.log('2 estrellas');
              setTimeout(() => {
                this.verMsg('Gracias por evaluar');
              }, 1000);
            }
          },
          {
            text: '3 estrellas',
            icon: 'star',
            handler: () => {
              console.log('3 estrellas');
              setTimeout(() => {
                this.verMsg('Gracias por evaluar');
              }, 1000);
            }
          },
          {
            text: '4 estrellas',
            icon: 'star',
            handler: () => {
              console.log('4 estrellas');
              setTimeout(() => {
                this.verMsg('Gracias por evaluar');
              }, 1000);
            }
          },
          {
            text: '5 estrellas',
            icon: 'star',
            handler: () => {
              console.log('5 estrellas');
              setTimeout(() => {
                this.verMsg('Gracias por evaluar');
              }, 1000);
            }
          }
        ]
    });
    hojaAccion.present();
  }

}
