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

  label: string = 'Total ';

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

    const montoInput = document.getElementById('monto');

    // Agrega un event listener para el evento 'keyup' en el elemento
    if (montoInput) {
      const montoInput = document.getElementById('monto');

      // Agrega un event listener para el evento 'keyup' en el elemento
      if (montoInput) {
        montoInput.addEventListener('keyup', (event: KeyboardEvent) => {
          // Verifica si la tecla presionada es 'Enter' (código 13)
          if (event.key === 'Enter') {
            // Llama a la función calcular() cuando se presiona 'Enter'
            this.calcular();
          }
        });
      }
    }
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
      });

  }

  filtrar(label: string, buscar: string) {
    const cadena = label.split(/\s+/);
    const index = cadena.indexOf(buscar);
    if (index !== -1) {
      cadena.splice(index, 1);
    }
    return cadena.join(' '); // Agregamos un return para que todas las rutas de acceso devuelvan un valor
  }

  calcular() {
    // Obtiene los valores seleccionados por el usuario
    const monedaSeleccionada = this.formulario.value.moneda;
    this.divisa = monedaSeleccionada;
    const montoIngresado = this.formulario.value.monto;

    // Realiza el cálculo en función de los valores obtenidos
    if (monedaSeleccionada === 'usdblue') {
      this.label = this.filtrar(this.label, 'USD:');
      // Realiza el cálculo para USD Blue a ARS
      // Usa el valor de montoIngresado para hacer el cálculo
      if (this.label.indexOf('ARS') === -1) {
        this.label = this.label + ' ARS:';
      }
      this.resultado = montoIngresado * this.datoApi.blue.value_avg; // Reemplaza TU_TASA_DE_CAMBIO con la tasa de cambio actual


    } else if (monedaSeleccionada === 'usdoficial') {
      this.label = this.filtrar(this.label, 'USD:');
      if (this.label.indexOf('ARS') === -1) {
        this.label = this.label + ' ARS:';
      }
      this.resultado = montoIngresado * this.datoApi.oficial.value_avg; // Reemplaza TU_TASA_DE_CAMBIO con la tasa de cambio actual


    } else if (monedaSeleccionada === 'ars') {
      this.label = this.filtrar(this.label, 'ARS:');
      if (this.label.indexOf('USD') === -1) {
        this.label = this.label + ' USD:';
      }
      // Realiza el cálculo para ARS a USD Blue
      // Usa el valor de montoIngresado para hacer el cálculo
      this.resultado = montoIngresado / this.datoApi.blue.value_avg; // Reemplaza TU_TASA_DE_CAMBIO con la tasa de cambio actual

    }
  }

}
