import { TestPregunta } from "./testPregunta"

export interface DataCorreccionTestAleatorio {
    cdicurso: number;
    id_curso: string;
    cdipermiso: number;
    cdicategoria: number; // 0 -> si no es aleatorio tematico
    preguntas_falladas: number;
    traducir: number;
    idioma: string;
    ayuda: number;
    autocorreccion: number;
    preguntas: Array<TestPregunta>;
    pwa: string;
    grabar_preguntas_falladas: number; //0->regenerado; 1->no
}