import { TestPregunta } from "./testPregunta";

export interface TestPredefinido {
    tipo_test: string;
    cdicurso: number;
    id_curso: string;
    nombre_curso: string;
    cdipermiso: number;
    nombre_permiso: string;
    cdicategoria: number;
    nombre_categoria: string;
    cditest: number;
    nombre_test: string;
    descripcion_test: string;
    traducir: number;
    idioma: string;
    ayuda: number;
    autocorreccion: number;
    propia: number;
    preguntas: Array<TestPregunta>;
}