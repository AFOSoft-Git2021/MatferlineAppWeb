import { inject, Pipe, PipeTransform } from '@angular/core';
import { StateService } from '../../data/repository/state.service';

@Pipe({
  name: 'firstChar',
})
export class FirstCharPipe implements PipeTransform {

  public stateService = inject(StateService);

  transform(value: string): string[] {

    const CHAR = value.charAt(0).toLowerCase()
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ü/g, 'u')
      .toUpperCase();

    let color = '';

    switch (CHAR) {
      case 'A':
        color = this.stateService.BackgroundLetterA
        break;
      case 'B':
        color = this.stateService.BackgroundLetterB
        break;
      case 'C':
        color = this.stateService.BackgroundLetterC
        break;
      case 'D':
        color = this.stateService.BackgroundLetterD
        break;
      case 'E':
        color = this.stateService.BackgroundLetterE
        break;
      case 'F':
        color = this.stateService.BackgroundLetterF
        break;
      case 'G':
        color = this.stateService.BackgroundLetterG
        break;
      case 'H':
        color = this.stateService.BackgroundLetterH
        break;
      case 'I':
        color = this.stateService.BackgroundLetterI
        break;
      case 'J':
        color = this.stateService.BackgroundLetterJ
        break;
      case 'K':
        color = this.stateService.BackgroundLetterK
        break;
      case 'L':
        color = this.stateService.BackgroundLetterL
        break;
      case 'M':
        color = this.stateService.BackgroundLetterM
        break;
      case 'N':
        color = this.stateService.BackgroundLetterN
        break;
      case 'Ñ':
        color = this.stateService.BackgroundLetterNH
        break;
      case 'O':
        color = this.stateService.BackgroundLetterO
        break;
      case 'P':
        color = this.stateService.BackgroundLetterP
        break;
      case 'Q':
        color = this.stateService.BackgroundLetterQ
        break;
      case 'R':
        color = this.stateService.BackgroundLetterR
        break;
      case 'S':
        color = this.stateService.BackgroundLetterS
        break;
      case 'T':
        color = this.stateService.BackgroundLetterT
        break;
      case 'U':
        color = this.stateService.BackgroundLetterU
        break;
      case 'V':
        color = this.stateService.BackgroundLetterV
        break;
      case 'W':
        color = this.stateService.BackgroundLetterW
        break;
      case 'X':
        color = this.stateService.BackgroundLetterX
        break;
      case 'Y':
        color = this.stateService.BackgroundLetterY
        break;
      case 'Z':
        color = this.stateService.BackgroundLetterZ
        break;
      default:
        color = this.stateService.BackgroundLetterA
        break;
    }

    return [CHAR, color];
  }

}
