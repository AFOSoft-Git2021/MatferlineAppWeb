import { PredefinidoPermisoCategoria } from "./predefinidoPermisoCategoria";

export interface PredefinidoPermiso {
  cdi: number;
  nombre: string;
  icono: string;
  categorias: PredefinidoPermisoCategoria[];
}