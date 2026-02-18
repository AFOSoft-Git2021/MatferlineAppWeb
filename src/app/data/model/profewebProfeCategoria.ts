import { ProfewebProfeCategoriaTema } from "./profewebProfeCategoriaTema";

export interface ProfewebProfeCategoria {
  cdi: number;
  nombre: string;
  icono: string;
  comentario: string;
  ayuda: number;
  autocorreccion: number;
  temas: ProfewebProfeCategoriaTema[];
}