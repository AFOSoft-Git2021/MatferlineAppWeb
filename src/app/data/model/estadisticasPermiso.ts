import { EstadisticasPermisoTest } from "./estadisticasPermisoTest";

export interface EstadisticasPermiso {
    num_test_aleatorios: number;
    num_test_predefinidos: number;
    num_test_preguntas_falladas: number;
    num_test: number;
    num_test_aptos: number;
    num_test_no_aptos: number;
    porcentaje_acierto: string;
    test: Array<EstadisticasPermisoTest>;
}