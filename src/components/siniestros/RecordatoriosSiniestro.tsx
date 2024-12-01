import React from 'react';
import { format, isAfter } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Recordatorio } from '../../types';

interface RecordatoriosSiniestroProps {
  recordatorios: Recordatorio[];
  onComplete?: (recordatorioId: string) => void;
}

export default function RecordatoriosSiniestro({
  recordatorios,
  onComplete,
}: RecordatoriosSiniestroProps) {
  const getIconForTipo = (tipo: string) => {
    switch (tipo) {
      case 'Liquidación':
        return Clock;
      case 'Prórroga':
        return AlertCircle;
      case 'Impugnación':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (recordatorio: Recordatorio) => {
    switch (recordatorio.estado) {
      case 'Completado':
        return 'text-green-500';
      case 'Vencido':
        return 'text-red-500';
      default:
        return isAfter(new Date(), new Date(recordatorio.fechaVencimiento))
          ? 'text-red-500'
          : 'text-yellow-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recordatorios y Plazos
      </h3>
      
      <div className="space-y-4">
        {recordatorios.map((recordatorio) => {
          const Icon = getIconForTipo(recordatorio.tipo);
          const statusColor = getStatusColor(recordatorio);
          
          return (
            <div
              key={recordatorio.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Icon className={`h-5 w-5 ${statusColor}`} />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {recordatorio.tipo}
                  </h4>
                  <p className="text-sm text-gray-500">{recordatorio.descripcion}</p>
                  <p className="text-xs text-gray-400">
                    Vence: {format(new Date(recordatorio.fechaVencimiento), 'PPP', { locale: es })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {recordatorio.estado === 'Pendiente' && onComplete && (
                  <button
                    onClick={() => onComplete(recordatorio.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                )}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${recordatorio.estado === 'Completado'
                      ? 'bg-green-100 text-green-800'
                      : recordatorio.estado === 'Vencido'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {recordatorio.estado}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}