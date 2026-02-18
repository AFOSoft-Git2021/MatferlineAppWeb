import { PredefinidoPermiso } from "./predefinidoPermiso";

export interface Predefinido {
  cdi: number;
  id: string;
  nombre: string;
  test_preguntas_falladas: number; // Byte mapeado a number
  permisos: PredefinidoPermiso[];
}