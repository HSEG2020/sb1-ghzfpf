import React, { useState } from 'react';
import { Search, DollarSign, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Cobranza as CobranzaType } from '../types';
import { formatUF, formatCLP } from '../utils/currency';

export default function Cobranza() {
  const [cobranzas] = useState<CobranzaType[]>([
    {
      id: '1',
      polizaId: '1',
      clienteId: '1',
      estado: 'Pendiente',
      cuotas: [
        {
          id: '1',
          polizaId: '1',
          numeroCuota: 1,
          fechaVencimiento: '2024-04-01',
          montoCuota: 150000,
          montoUF: 4.5,
          valorUF: 35842.97,
          estado: 'Pendiente'
        }
      ],
      recordatorios: []
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Cobranza</h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar por cliente o número de póliza..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Todos los estados</option>
            <option value="Al Día">Al Día</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Mora">En Mora</option>
            <option value="Completada">Completada</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº Póliza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Próximo Vencimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
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
              {cobranzas.map((cobranza) => {
                const proximaCuota = cobranza.cuotas.find(c => c.estado === 'Pendiente');
                
                return (
                  <tr key={cobranza.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">
                          POL-2024-001
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Juan Pérez</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {proximaCuota && (
                        <div className="text-sm text-gray-900">
                          {format(new Date(proximaCuota.fechaVencimiento), 'PPP', { locale: es })}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {proximaCuota && (
                        <>
                          <div className="text-sm text-gray-900">
                            {formatUF(proximaCuota.montoUF)} UF
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatCLP(proximaCuota.montoCuota)}
                          </div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${cobranza.estado === 'Al Día' ? 'bg-green-100 text-green-800' :
                          cobranza.estado === 'En Mora' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                      >
                        {cobranza.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}