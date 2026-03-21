import { Component, inject, input, OnInit, numberAttribute, signal } from '@angular/core';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { CabeceraProfe } from "../cabecera-profe/cabecera-profe";
import { ProfewebProfe } from '../../../../data/model/profewebProfe';
import { ItemListaTest } from "../item-lista-profe-tema/item-lista-profe-tema";
import { ItemCategoriaProfe } from "../item-categoria-profe/item-categoria-profe";
import { BotonExamenEstudio } from "../../boton-examen-estudio/boton-examen-estudio";
import { ProfeDataGetTema } from '../../../../data/model/profeDataGetTema';
import { Profeweb } from '../../../../data/model/profeweb';
import { ProfewebProfeCategoriaTema } from '../../../../data/model/profewebProfeCategoriaTema';

@Component({
  selector: 'app-profeweb-categorias',
  imports: [DashboardAppBar, CabeceraProfe, ItemListaTest, ItemCategoriaProfe, BotonExamenEstudio],
  templateUrl: './profeweb-categorias.html',
  styleUrl: './profeweb-categorias.scss',
})
export class ProfewebCategorias implements OnInit {

  private router = inject(Router);
  public stateService = inject(StateService);

  indexCurso = input.required({ transform: numberAttribute });
  index = input.required({ transform: numberAttribute });
  profewebcdi = input.required({ transform: numberAttribute });
  profewebid = input.required<string>();
  profecdi = input.required({ transform: numberAttribute });

  nombreProfe = signal('');
  profeweb: ProfewebProfe | null = null;
  showState = signal<boolean[]>([]);
  autocorreccionState = signal<number[]>([]);
  idiomaSelected = signal(0);

  ngOnInit() {
    const PROFEWEB_ARRAY = this.stateService.alumnoLogeado()?.profeweb;
    if (PROFEWEB_ARRAY) {
      for (const profeweb of PROFEWEB_ARRAY) {
        if (profeweb.cdi.toString() === this.profewebcdi().toString()) {
          this.nombreProfe.set(profeweb.nombre);
          for (const profe of profeweb.profes) {
            if (profe.cdi.toString() === this.profecdi().toString()) {
              this.profeweb = profe;
              break;
            }
          }
          break;
        }
      }
    }

    this.showState.set(new Array(this.profeweb?.categorias.length).fill((this.profeweb?.categorias.length === 1) ? true : false));
    this.autocorreccionState.set(new Array(this.profeweb?.categorias.length).fill(0));
  }

  showProfeCategoria(index: number) {
    this.showState()[index] = !this.showState()[index];
  }

  setIidiomaSelected(index: number) {
    this.idiomaSelected.set(index);
  }

  setAutocorreccionCategoria(index: number, value: number) {
    console.log(`setAutocorreccionCategoria: index=${index}, value=${value}`);

    this.autocorreccionState()[index] = value;
  }

  getTemaProfe(indexCategoria: number, tema: ProfewebProfeCategoriaTema) {
    const profeDataGetTema: ProfeDataGetTema = {
      cdicurso: this.profewebcdi().toString(),
      id_curso: this.profewebid(),
      nombre_curso: this.nombreProfe(),
      cdiprofe: this.profecdi().toString(),
      nombre_profe: this.profeweb?.nombre ?? '',
      cdicategoria: this.profeweb?.categorias[indexCategoria].cdi.toString() ?? '',
      nombre_categoria: this.profeweb?.categorias[indexCategoria].nombre ?? '',
      cditema: tema.cdi.toString(),
      nombre_tema: tema.titulo,
      descripcion_tema: tema.descripcion,
      cditest: tema.cditest.toString(),
      traducir: this.idiomaSelected().toString(),
      idioma: (this.idiomaSelected() === 1 ? this.stateService.alumnoLogeado()?.idioma?.code : '') ?? '',
      ayuda: '1',
      autocorreccion: this.profeweb?.categorias[indexCategoria].autocorreccion.toString() ?? '0'
    }
    this.stateService.profeDataGetTema.set(profeDataGetTema);
    this.router.navigate(['/profeweb']);
  }

  navigateEstadisticas(cdicategoria: number, nombrecategoria: string, iconocategoria: string) {
    const ICONO = (iconocategoria.length > 0) ? iconocategoria : (this.profeweb?.logotipo ?? '')
    const DATA = `${this.nombreProfe()}***${this.profeweb?.nombre}***${nombrecategoria}***${this.indexCurso()}***${this.index()}}***${ICONO}***${this.profewebcdi()}***${this.profeweb?.cdi}***${cdicategoria}`;
    this.router.navigate(['/dashboard/profeweb-lista-reproducciones', DATA]);
  }

  navigateBack() {
    this.router.navigate(['/dashboard/profeweb']);
  }

}
