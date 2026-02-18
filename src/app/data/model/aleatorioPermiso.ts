import { AleatorioPermisoTestExamen } from "./aleatorioPermisoTestExamen";
import { AleatorioPermisoTestTematico } from "./aleatorioPermisoTestTematico";

export interface AleatorioPermiso {
  cdi: number;
  nombre: string;
  icono: string;
  test_examen?: AleatorioPermisoTestExamen;
  test_tematicos?: AleatorioPermisoTestTematico;
}