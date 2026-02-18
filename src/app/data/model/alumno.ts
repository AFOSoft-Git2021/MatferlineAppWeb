import { Aleatorio } from "./aleatorio";
import { Autoescuela } from "./autoescuela";
import { Idioma } from "./idioma";
import { Predefinido } from "./predefinido";
import { Profeweb } from "./profeweb";

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
    aleatorios: Aleatorio[];
    profeweb: Profeweb[];
    predefinidos: Predefinido[];
}