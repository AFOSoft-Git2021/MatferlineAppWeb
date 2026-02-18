import { Autoescuela } from "./autoescuela";
import { Idioma } from "./idioma";

export interface Alumno {
    cdialumno: string;
    token: string;
    nombre: string;
    foto: string;
    fecha_alta: number;
    fecha_control: number;
    servicio_inicial: string;
    autoescuela: Autoescuela;
    idioma: Idioma;
}