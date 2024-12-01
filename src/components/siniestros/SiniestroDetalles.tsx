// Previous imports remain...
import RecordatoriosSiniestro from './RecordatoriosSiniestro';
import { actualizarEstadoRecordatorios } from '../../utils/siniestros';

// ... rest of the imports

export default function SiniestroDetalles({
  siniestro,
  poliza,
  cliente,
  onBack,
}: SiniestroDetallesProps) {
  // Previous state and handlers remain...

  const recordatoriosActualizados = actualizarEstadoRecordatorios(siniestro.recordatorios);

  return (
    <div className="space-y-6">
      {/* Previous content remains... */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Previous content remains... */}
          
          <RecordatoriosSiniestro
            recordatorios={recordatoriosActualizados}
            onComplete={(recordatorioId) => {
              // Implement completion handler
              console.log('Completar recordatorio:', recordatorioId);
            }}
          />
          
          {/* Rest of the content remains... */}
        </div>
        
        {/* Sidebar content remains... */}
      </div>
    </div>
  );
}