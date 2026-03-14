import { TestPregunta } from "./testPregunta";

export interface DataCorreccionTestPredefinido {
    cdicurso: number;
    id_curso: string;
    cdipermiso: number;
    cdicategoria: number;
    cditest: number;
    propia: number;
    traducir: number;
    idioma: string;
    ayuda: number;
    autocorreccion: number;
    preguntas: Array<TestPregunta>;
}