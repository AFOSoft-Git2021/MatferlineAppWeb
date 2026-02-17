import { Component, input, output } from '@angular/core';
import { Autoescuela } from '../../../data/model/autoescuela';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-item-list-autoescuela',
  imports: [],
  templateUrl: './item-list-autoescuela.html',
  styleUrl: './item-list-autoescuela.scss',
})
export class ItemListAutoescuela {

  autoescuela = input.required<Autoescuela>();
  clickEmitter = output();
  BASE_STORAGE = environment.BASE_STORAGE;

  clickAutoescuela() {
    this.clickEmitter.emit();
  }
}
