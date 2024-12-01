import { Cuota, Cliente, Poliza } from '../types';
import { formatUF, formatCLP } from './currency';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface CuponPagoData {
  numeroPoliza: string;
  cliente: {
    nombre: string;
    apellidos: string;
    dni: string;
  };
  cuota: {
    numero: number;
    fechaVencimiento: string;
    montoUF: number;
    montoCLP: number;
  };
  codigoBarras: string;
}

export function generarCodigoBarras(poliza: string, numeroCuota: number): string {
  // En un ambiente real, esto generaría un código de barras real
  // Por ahora retornamos un placeholder
  return `${poliza}-${numeroCuota}-${Date.now()}`;
}

export function prepararDatosCupon(
  cuota: Cuota,
  cliente: Cliente,
  poliza: Poliza
): CuponPagoData {
  return {
    numeroPoliza: poliza.numeroPoliza,
    cliente: {
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      dni: cliente.dni
    },
    cuota: {
      numero: cuota.numeroCuota,
      fechaVencimiento: format(new Date(cuota.fechaVencimiento), 'dd/MM/yyyy'),
      montoUF: cuota.montoUF,
      montoCLP: cuota.montoCuota
    },
    codigoBarras: generarCodigoBarras(poliza.numeroPoliza, cuota.numeroCuota)
  };
}