import { addDays, addMonths, isBefore, isAfter } from 'date-fns';
import { 
  Poliza, 
  Cuota, 
  Cobranza, 
  RecordatorioCobranza,
  EstadoCuota,
  EstadoCobranza 
} from '../types';

const DIAS_AVISO_VENCIMIENTO = 5;
const DIAS_PRIMERA_MORA = 30;
const DIAS_SEGUNDA_MORA = 60;

export function generarCuotas(poliza: Poliza): Cuota[] {
  const cuotas: Cuota[] = [];
  const fechaInicio = new Date(poliza.fechaInicio);
  let numeroCuotas: number;

  switch (poliza.formaPago) {
    case 'Mensual':
      numeroCuotas = 12;
      break;
    case 'Trimestral':
      numeroCuotas = 4;
      break;
    case 'Semestral':
      numeroCuotas = 2;
      break;
    case 'Anual':
      numeroCuotas = 1;
      break;
  }

  const montoCuotaUF = poliza.primaAnualUF / numeroCuotas;

  for (let i = 0; i < numeroCuotas; i++) {
    const fechaVencimiento = addMonths(fechaInicio, i);
    
    cuotas.push({
      id: crypto.randomUUID(),
      polizaId: poliza.id,
      numeroCuota: i + 1,
      fechaVencimiento: fechaVencimiento.toISOString(),
      montoCuota: montoCuotaUF * poliza.valorUF,
      montoUF: montoCuotaUF,
      valorUF: poliza.valorUF,
      estado: 'Pendiente'
    });
  }

  return cuotas;
}

export function generarRecordatoriosCobranza(cobranza: Cobranza): RecordatorioCobranza[] {
  const recordatorios: RecordatorioCobranza[] = [];
  const cuotasOrdenadas = [...cobranza.cuotas].sort(
    (a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime()
  );

  cuotasOrdenadas.forEach((cuota) => {
    const fechaVencimiento = new Date(cuota.fechaVencimiento);
    
    // Recordatorio de próximo vencimiento
    recordatorios.push({
      id: crypto.randomUUID(),
      cobranzaId: cobranza.id,
      cuotaId: cuota.id,
      tipo: 'Próximo Vencimiento',
      fechaVencimiento: addDays(fechaVencimiento, -DIAS_AVISO_VENCIMIENTO).toISOString(),
      estado: 'Pendiente',
      descripcion: `Vencimiento cuota ${cuota.numeroCuota} en 5 días`,
      fechaCreacion: new Date().toISOString()
    });

    // Recordatorios de mora
    recordatorios.push({
      id: crypto.randomUUID(),
      cobranzaId: cobranza.id,
      cuotaId: cuota.id,
      tipo: 'Primera Mora',
      fechaVencimiento: addDays(fechaVencimiento, DIAS_PRIMERA_MORA).toISOString(),
      estado: 'Pendiente',
      descripcion: `Primera mora cuota ${cuota.numeroCuota}`,
      fechaCreacion: new Date().toISOString()
    });

    recordatorios.push({
      id: crypto.randomUUID(),
      cobranzaId: cobranza.id,
      cuotaId: cuota.id,
      tipo: 'Segunda Mora',
      fechaVencimiento: addDays(fechaVencimiento, DIAS_SEGUNDA_MORA).toISOString(),
      estado: 'Pendiente',
      descripcion: `Segunda mora cuota ${cuota.numeroCuota} - Riesgo de cancelación`,
      fechaCreacion: new Date().toISOString()
    });
  });

  return recordatorios;
}

export function actualizarEstadoCuotas(cuotas: Cuota[]): Cuota[] {
  const ahora = new Date();
  
  return cuotas.map(cuota => {
    if (cuota.estado === 'Pagada') {
      return cuota;
    }

    const fechaVencimiento = new Date(cuota.fechaVencimiento);
    
    if (isAfter(ahora, addDays(fechaVencimiento, DIAS_SEGUNDA_MORA))) {
      return { ...cuota, estado: 'En Mora' };
    }
    
    if (isAfter(ahora, fechaVencimiento)) {
      return { ...cuota, estado: 'Vencida' };
    }
    
    return cuota;
  });
}

export function calcularEstadoCobranza(cuotas: Cuota[]): EstadoCobranza {
  const todasPagadas = cuotas.every(cuota => cuota.estado === 'Pagada');
  if (todasPagadas) return 'Completada';

  const algunaEnMora = cuotas.some(cuota => cuota.estado === 'En Mora');
  if (algunaEnMora) return 'En Mora';

  const algunaVencida = cuotas.some(cuota => cuota.estado === 'Vencida');
  if (algunaVencida) return 'Pendiente';

  return 'Al Día';
}