import { PredefinidoPermisoCategoriaTest } from "./predefinidoPermisoCategoriaTest";

export interface PredefinidoPermisoCategoria {
  cdicategoria: number;
  nombre: string;
  ayuda: number; // Byte -> number
  autocorreccion: number; // Byte -> number
  propia: number; // Byte -> number
  test: PredefinidoPermisoCategoriaTest[];
}