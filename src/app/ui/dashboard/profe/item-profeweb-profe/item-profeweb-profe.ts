import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-profeweb-profe',
  imports: [MatIconModule],
  templateUrl: './item-profeweb-profe.html',
  styleUrl: './item-profeweb-profe.scss',
})
export class ItemProfewebProfe {

  index = input.required<number>();
  nombreProfe = input.required<string>();
  clickProfeEmitter = output();

  clickProfe() {
    this.clickProfeEmitter.emit();
  }

}
