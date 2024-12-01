import { addDays, isAfter, isBefore } from 'date-fns';
import { Siniestro, Poliza, Recordatorio } from '../types';

export const PLAZO_LIQUIDACION_MENOR = 45; // días para pólizas < 100 UF
export const PLAZO_LIQUIDACION_MAYOR = 90; // días para pólizas >= 100 UF
export const PLAZO_IMPUGNACION = 10; // días desde informe final

export function calcularFechaVencimiento(
  fechaInicio: Date,
  primaUF: number,
  tipoRecordatorio: 'Liquidación' | 'Prórroga' | 'Impugnación'
): Date {
  if (tipoRecordatorio === 'Impugnación') {
    return addDays(fechaInicio, PLAZO_IMPUGNACION);
  }

  const plazoBase = primaUF < 100 ? PLAZO_LIQUIDACION_MENOR : PLAZO_LIQUIDACION_MAYOR;
  return addDays(fechaInicio, plazoBase);
}

export function generarRecordatorios(siniestro: Siniestro, poliza: Poliza): Recordatorio[] {
  const recordatorios: Recordatorio[] = [];
  const fechaOcurrencia = new Date(siniestro.fechaOcurrencia);
  
  // Recordatorio de liquidación inicial
  const fechaVencimientoLiquidacion = calcularFechaVencimiento(
    fechaOcurrencia,
    poliza.primaAnualUF,
    'Liquidación'
  );

  recordatorios.push({
    id: crypto.randomUUID(),
    tipo: 'Liquidación',
    fechaVencimiento: fechaVencimientoLiquidacion.toISOString(),
    estado: 'Pendiente',
    descripcion: `Plazo de liquidación: ${poliza.primaAnualUF < 100 ? '45' : '90'} días`,
    fechaCreacion: new Date().toISOString(),
  });

  // Si hay prórroga, agregar recordatorio adicional
  if (siniestro.fechaProrroga) {
    const fechaVencimientoProrroga = calcularFechaVencimiento(
      new Date(siniestro.fechaProrroga),
      poliza.primaAnualUF,
      'Prórroga'
    );

    recordatorios.push({
      id: crypto.randomUUID(),
      tipo: 'Prórroga',
      fechaVencimiento: fechaVencimientoProrroga.toISOString(),
      estado: 'Pendiente',
      descripcion: 'Prórroga de liquidación solicitada',
      fechaCreacion: new Date().toISOString(),
    });
  }

  // Si hay informe final, agregar recordatorio de impugnación
  if (siniestro.fechaInformeFinal) {
    const fechaVencimientoImpugnacion = calcularFechaVencimiento(
      new Date(siniestro.fechaInformeFinal),
      poliza.primaAnualUF,
      'Impugnación'
    );

    recordatorios.push({
      id: crypto.randomUUID(),
      tipo: 'Impugnación',
      fechaVencimiento: fechaVencimientoImpugnacion.toISOString(),
      estado: 'Pendiente',
      descripcion: 'Plazo para impugnación del informe final',
      fechaCreacion: new Date().toISOString(),
    });
  }

  return recordatorios;
}

export function actualizarEstadoRecordatorios(recordatorios: Recordatorio[]): Recordatorio[] {
  const ahora = new Date();
  
  return recordatorios.map(recordatorio => {
    const fechaVencimiento = new Date(recordatorio.fechaVencimiento);
    
    if (recordatorio.estado === 'Completado') {
      return recordatorio;
    }
    
    if (isAfter(ahora, fechaVencimiento)) {
      return { ...recordatorio, estado: 'Vencido' };
    }
    
    return recordatorio;
  });
}