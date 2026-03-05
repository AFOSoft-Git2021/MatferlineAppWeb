import { TestRespuesta } from "./testRespuesta";

export interface TestPregunta {
    orden: number;
    cdipregunta: string;
    enunciado: string;
    ayuda: string;
    foto: string;
    seleccion: number;
    respuestas: Array<TestRespuesta>
}