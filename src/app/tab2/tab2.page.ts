import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { when } from 'q';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  valorIMC: any;
  valorPesoIdeal: any;
  valorCalorias: any;
  valorPeso: number = 30;
  valorEstatura: number = 100;
  valorEdad: number = 15;
  caloriaschbx: boolean = false;
  loading: any;
  ok: boolean = false;

  constructor(
    public navController: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController) {
  }

  irACalculos() {
    this.verCargando();
    this.navController.navigateForward(`/calculos/${this.valorCalorias}/${this.valorPesoIdeal}/${this.valorIMC}`);
  }

  irATab1() {
    this.navController.navigateBack('tab1');
  }

  acercaDe() {
    this.navController.navigateBack('tab3');
  }

  irATab2(){
    this.navController.navigateForward('tab2');
  }

  calcular(imc: boolean, pesoIdeal: boolean, caloriaschbx: boolean, grupoCalorias: string, edad: any, valorPeso: any, estatura: any, genero: any) {
    edad = parseInt(edad);
    valorPeso = parseInt(valorPeso);
    estatura = parseFloat(estatura);
    genero = parseInt(genero);

    if (edad == null || valorPeso == null || estatura == null) {
      this.verMsg('Debe Ingresar los datos pedidos');
    } else {
      if (genero > 0) {
        if (!imc && !pesoIdeal && !caloriaschbx) {
          this.verMsg('Debe seleccionar una opción para continuar');
        } else {
          if (imc) {
            this.calcularIMC(valorPeso, estatura);
          } else {
            this.valorIMC = 0;
          }

          if (pesoIdeal) {
            this.calcularPesoIdeal(estatura, genero);
          } else {
            this.valorPesoIdeal = 0;
          }

          if (this.caloriaschbx) {
            if (grupoCalorias == null) {
              this.verMsg('Debe indicar su actividad física');
            } else {
              var valorCal: any;
              switch (grupoCalorias) {
                case "sedentario":
                  valorCal = 1.2;
                  break;

                case "moderado":
                  valorCal = 1.375;
                  break;

                case "activo":
                  valorCal = 1.55;
                  break;

                case "full":
                  valorCal = 1.9;
                  break;
              }
              this.calculoCalorias(valorPeso, estatura, edad, valorCal, genero);
              this.irACalculos();
            }
          } else {
            this.valorCalorias = 0;
            this.irACalculos();
          }
        }
      } else {
        this.verMsg('Debe indicar su género');
      }
    }

  }

  calculoCalorias(peso: any, estatura: any, edad: any, valor: any, genero: any) {
    peso = parseInt(peso);
    edad = parseInt(edad);
    estatura = parseFloat(estatura);
    valor = parseFloat(valor);
    genero = parseInt(genero);
    switch (genero) {
      case 1:
        this.valorCalorias = ((13.75 * peso) + (5 * estatura) - (6.76 * edad) + 66) * valor;
        break;

      case 2:
        this.valorCalorias = ((9.56 * peso) + (1.85 * estatura) - (4.68 * edad) + 655) * valor;
        break;
    }
  }

  async verCargando() {
    this.loading = await this.loadingController.create({
      spinner: "circles",
      duration: 1500,
      message: 'espere...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  verQuemadas(caloriaschbx: boolean) {
    this.caloriaschbx = caloriaschbx;
  }

  calcularPesoIdeal(estatura: any, sexo: any) {
    if (sexo == 1) {
      this.valorPesoIdeal = estatura - 100 - ((estatura - 150) / 4);
    }
    if (sexo == 2) {
      this.valorPesoIdeal = estatura - 100 - ((estatura - 150) / 2.5);
    }
  }

  calcularIMC(peso: any, estatura: any) {
    this.valorIMC = peso / ((estatura * estatura) / 10000);
  }

  async verMsg(mensaje) {
    const evento = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    evento.present();
  }

}
