import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-test-bottomsheet-buscar',
  imports: [],
  templateUrl: './test-bottomsheet-buscar.html',
  styleUrl: './test-bottomsheet-buscar.scss',
})
export class TestBottomsheetBuscar {

  // Inyecta los datos recibidos y la referencia para cerrar
  data = inject(MAT_BOTTOM_SHEET_DATA);
  private bottomSheetRef = inject(MatBottomSheetRef<TestBottomsheetBuscar>);

  // cierra al seleccionar una pregunta
  public cerrar(pregunta: number) {
    this.bottomSheetRef.dismiss({
      pregunta
    })
  }

}
