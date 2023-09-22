import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  datoApi: any;
  resultado: number = 0;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      moneda: new FormControl(''),
      monto: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getDatos();
  }

  getDatos() {
    const api = fetch('https://api.bluelytics.com.ar/v2/latest')
      .then(res => res.json())
      .then(data => {
        this.datoApi = data;
        console.log(this.datoApi);
      });

  }

  calcular() {
    // Obtiene los valores seleccionados por el usuario
    const monedaSeleccionada = this.formulario.value.moneda;
    const montoIngresado = this.formulario.value.monto;

    // Realiza el cálculo en función de los valores obtenidos
    if (monedaSeleccionada === 'usdblue') {
      // Realiza el cálculo para USD Blue a ARS
      // Usa el valor de montoIngresado para hacer el cálculo
      this.resultado = montoIngresado * this.datoApi.blue.value_avg; // Reemplaza TU_TASA_DE_CAMBIO con la tasa de cambio actual
      console.log('resultado: ', this.resultado)
      // this.formulario.patchValue({ resultado: resultado });
    } else if (monedaSeleccionada === 'ars') {
      // Realiza el cálculo para ARS a USD Blue
      // Usa el valor de montoIngresado para hacer el cálculo
      this.resultado = montoIngresado / this.datoApi.blue.value_avg; // Reemplaza TU_TASA_DE_CAMBIO con la tasa de cambio actual
      console.log('resultado: ', this.resultado)
      // this.formulario.patchValue({ resultado: resultado });
    }
  }

}
