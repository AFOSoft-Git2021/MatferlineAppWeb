import { ProfewebProfeCategoria } from "./profewebProfeCategoria";

export interface ProfewebProfe {
  cdi: number;
  nombre: string;
  logotipo: string;
  categorizado: number; // Byte mapeado a number
  categorias: ProfewebProfeCategoria[];
}