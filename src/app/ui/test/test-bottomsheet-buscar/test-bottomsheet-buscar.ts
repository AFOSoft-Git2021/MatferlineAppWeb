import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TestPregunta } from '../../../data/model/testPregunta';

@Component({
  selector: 'app-test-bottomsheet-buscar',
  imports: [CommonModule],
  templateUrl: './test-bottomsheet-buscar.html',
  styleUrl: './test-bottomsheet-buscar.scss',
})
export class TestBottomsheetBuscar implements OnInit {

  // Inyecta los datos recibidos y la referencia para cerrar
  data = inject(MAT_BOTTOM_SHEET_DATA);
  private bottomSheetRef = inject(MatBottomSheetRef<TestBottomsheetBuscar>);

  modoCorreccion: boolean = false;
  autocorreccion: number = 0;
  listCorregidasAutocorreccion: boolean[] = [];
  preguntasTest: TestPregunta[] = [];
  listaRespuestasCorrectas: number[] = [];


  constructor() {
    this.modoCorreccion = this.data.modoCorreccion;
    this.autocorreccion = this.data.autocorreccion;
    this.listCorregidasAutocorreccion = this.data.listCorregidasAutocorreccion;
    this.preguntasTest = this.data.preguntasTest;
  }

  ngOnInit() {
    if (this.modoCorreccion || this.autocorreccion === 1) {
      this.preguntasTest.map(pregunta => {
        for (const [index, respuesta] of pregunta.respuestas.entries()) {
          if (respuesta.correcta === 1) {
            this.listaRespuestasCorrectas.push(index);
            break;
          }
        }
      })
      console.log(this.listaRespuestasCorrectas);
    }
  }

  // cierra al seleccionar una pregunta
  public cerrar(pregunta: number) {
    this.bottomSheetRef.dismiss({
      pregunta
    })
  }

}
