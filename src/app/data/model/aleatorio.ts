import { AleatorioPermiso } from "./aleatorioPermiso";

export interface Aleatorio {
  cdi: number;
  id: string;
  nombre: string;
  test_preguntas_falladas: number; // Byte se mapea a number en TS
  permisos: AleatorioPermiso[];
}