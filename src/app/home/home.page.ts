import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formulario: FormGroup;

  b_promedio: number = 0;
  b_compra: number = 0;
  b_venta: number = 0;

  o_promedio: number = 0;
  o_compra: number = 0;
  o_venta: number = 0;

  divisa: string = '';

  datoApi: any;
  resultado: number = 0;
  
b_blue: any;

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
        this.b_promedio = this.datoApi.blue.value_avg;
        this.b_compra = this.datoApi.blue.value_buy;
        this.b_venta = this.datoApi.blue.value_sell;

        this.o_promedio = this.datoApi.oficial.value_avg;
        this.o_compra = this.datoApi.oficial.value_buy;
        this.o_venta = this.datoApi.oficial.value_sell;
        console.log(this.datoApi);
      });

  }

  calcular() {
    // Obtiene los valores seleccionados por el usuario
    const monedaSeleccionada = this.formulario.value.moneda;
    this.divisa = monedaSeleccionada;
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
