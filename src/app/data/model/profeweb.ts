import { ProfewebProfe } from "./profewebProfe";

export interface Profeweb {
  cdi: number;
  id: string;
  nombre: string;
  test_preguntas_falladas: number; // Byte mapeado a number
  profes: ProfewebProfe[];
}