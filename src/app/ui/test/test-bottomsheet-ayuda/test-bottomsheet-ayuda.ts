import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-test-bottomsheet-ayuda',
  imports: [],
  templateUrl: './test-bottomsheet-ayuda.html',
  styleUrl: './test-bottomsheet-ayuda.scss',
})
export class TestBottomsheetAyuda {

  // Inyecta los datos recibidos y la referencia para cerrar
  data = inject(MAT_BOTTOM_SHEET_DATA);
  private bottomSheetRef = inject(MatBottomSheetRef<TestBottomsheetAyuda>);

  // cierra al hacer click sobre el texto
  public cerrar() {
    this.bottomSheetRef.dismiss()
  }

}
