// Previous interfaces and types remain the same...

export const COMPANIAS: Compania[] = [
  { id: '1', nombre: 'Chilena Consolidada', codigo: 'CHI' },
  { id: '2', nombre: 'Consorcio', codigo: 'CON' },
  { id: '3', nombre: 'Mapfre', codigo: 'MAP' },
  { id: '4', nombre: 'HDI Seguros', codigo: 'HDI' },
  { id: '5', nombre: 'BCI Seguros', codigo: 'BCI' }
];

export const RAMOS_SEGURO: RamoSeguro[] = [
  { 
    id: '1', 
    nombre: 'Vida Individual', 
    codigo: 'VIN',
    descripcion: 'Seguros de vida individual y ahorro'
  },
  { 
    id: '2', 
    nombre: 'Salud', 
    codigo: 'SAL',
    descripcion: 'Seguros de salud y gastos médicos'
  },
  { 
    id: '3', 
    nombre: 'Hogar', 
    codigo: 'HOG',
    descripcion: 'Seguros para viviendas y contenido'
  },
  { 
    id: '4', 
    nombre: 'Vehículos', 
    codigo: 'VEH',
    descripcion: 'Seguros para automóviles y otros vehículos'
  },
  { 
    id: '5', 
    nombre: 'Responsabilidad Civil', 
    codigo: 'RCI',
    descripcion: 'Seguros de responsabilidad civil'
  }
];

// Export all types and interfaces
export type {
  Cliente,
  Poliza,
  Siniestro,
  DocumentoSiniestro,
  ComentarioSiniestro,
  Recordatorio,
  Cuota,
  Cobranza,
  RecordatorioCobranza,
  Compania,
  RamoSeguro,
  FormaPago,
  EstadoPoliza,
  EstadoSiniestro,
  TipoDocumento,
  TipoRecordatorio,
  EstadoRecordatorio,
  EstadoCuota,
  EstadoCobranza,
  TipoRecordatorioCobranza
};