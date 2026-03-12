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
  listaResultados: number[] = []; // 0->sin contestar; 1->acierto; 2->fallo


  constructor() {
    this.modoCorreccion = this.data.modoCorreccion();
    this.autocorreccion = this.data.autocorreccion();
    this.listCorregidasAutocorreccion = this.data.listCorregidasAutocorreccion();
    this.preguntasTest = this.data.preguntasTest;
  }


  ngOnInit() {
    this.preguntasTest.map(pregunta => {
      if (pregunta.seleccion === 0) {
        this.listaResultados.push(0);
      } else {
        for (const [index, respuesta] of pregunta.respuestas.entries()) {
          if (respuesta.correcta === 1 && pregunta.seleccion === index + 1) {
            this.listaResultados.push(1);
          } else {
            this.listaResultados.push(2);
          }
        }
      }
    })
  }

  // cierra al seleccionar una pregunta
  public cerrar(pregunta: number) {
    this.bottomSheetRef.dismiss({
      pregunta
    })
  }

}
