import { DataResponseCorregirTestDatosCorreccion } from "./dataResponseCorregirTestDatosCorreccion";

export interface DataResponseCorregirTest {
    status: string;
    code: number;
    message: string;
    datos_correcion: DataResponseCorregirTestDatosCorreccion
}