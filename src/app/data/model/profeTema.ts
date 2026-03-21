import { ProfeTemaElemento } from "./ProfeTemaElemento";

export interface ProfeTema {

    cdicurso: number;
    id_curso: string;
    nombre_curso: string;
    cdiprofe: number;
    nombre_profe: string;
    cdicategoria: number;
    nombre_categoria: string;
    cditema: number;
    nombre_tema: string;
    descripcion_tema: string;
    reproducido: number;
    umbral: number;
    cditest: number;
    traducir: number;
    idioma: string;
    ayuda: number;
    autocorreccion: number;
    elementos: Array<ProfeTemaElemento>;
    
}