import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, AlertCircle, CheckCircle, DollarSign, ArrowLeft } from 'lucide-react';
import { Cobranza, Poliza, Cliente } from '../../types';
import { formatUF, formatCLP } from '../../utils/currency';
import EnviarCuponModal from './EnviarCuponModal';

interface CobranzaDetallesProps {
  cobranza: Cobranza;
  poliza: Poliza;
  cliente: Cliente;
  onBack: () => void;
}

export default function CobranzaDetalles({
  cobranza,
  poliza,
  cliente,
  onBack
}: CobranzaDetallesProps) {
  const [showCuponModal, setShowCuponModal] = useState(false);
  const [selectedCuota, setSelectedCuota] = useState<typeof cobranza.cuotas[0] | null>(null);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pagada':
        return 'bg-green-100 text-green-800';
      case 'Vencida':
        return 'bg-yellow-100 text-yellow-800';
      case 'En Mora':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleGenerarCupon = (cuota: typeof cobranza.cuotas[0]) => {
    setSelectedCuota(cuota);
    setShowCuponModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>
        
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${getEstadoColor(cobranza.estado)}`}
        >
          {cobranza.estado}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Detalle de Cuotas
          </h3>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Póliza:</span> {poliza.numeroPoliza}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº Cuota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto UF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto CLP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cobranza.cuotas.map((cuota) => (
                <tr key={cuota.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {cuota.numeroCuota}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(cuota.fechaVencimiento), 'PPP', { locale: es })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatUF(cuota.montoUF)} UF
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCLP(cuota.montoCuota)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${getEstadoColor(cuota.estado)}`}
                    >
                      {cuota.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {cuota.estado !== 'Pagada' && (
                      <button 
                        onClick={() => handleGenerarCupon(cuota)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end space-x-1"
                      >
                        <DollarSign className="h-5 w-5" />
                        <span>Generar Cupón</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recordatorios
        </h3>

        <div className="space-y-4">
          {cobranza.recordatorios.map((recordatorio) => (
            <div
              key={recordatorio.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {recordatorio.tipo === 'Próximo Vencimiento' ? (
                  <Clock className="h-5 w-5 text-blue-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {recordatorio.tipo}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {recordatorio.descripcion}
                  </p>
                  <p className="text-xs text-gray-400">
                    Vence: {format(new Date(recordatorio.fechaVencimiento), 'PPP', { locale: es })}
                  </p>
                </div>
              </div>

              <span className={`px-2 py-1 rounded-full text-xs font-medium
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
          ))}
        </div>
      </div>

      {showCuponModal && selectedCuota && (
        <EnviarCuponModal
          cuota={selectedCuota}
          cliente={cliente}
          poliza={poliza}
          onClose={() => {
            setShowCuponModal(false);
            setSelectedCuota(null);
          }}
        />
      )}
    </div>
  );
}