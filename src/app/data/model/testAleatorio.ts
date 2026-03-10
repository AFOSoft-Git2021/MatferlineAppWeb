import { TestPregunta } from "./testPregunta";

export interface TestAleatorio {
    tipo_test: string;
    cdicurso: number;
    id_curso: string;
    nombre_curso: string;
    cdipermiso: number;
    nombre_permiso: string;
    nombre_test: number;
    cdicategoria: number;
    nombre_categoria: string;
    descripcion_categoria: string;
    traducir: number;
    idioma: string;
    ayuda: number;
    autocorreccion: number;
    preguntas: Array<TestPregunta>;
}