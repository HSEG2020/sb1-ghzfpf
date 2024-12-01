import React, { useState } from 'react';
import { Plus, Search, FileText, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Siniestro } from '../types';

export default function Siniestros() {
  const [siniestros] = useState<Siniestro[]>([
    {
      id: '1',
      polizaId: '1',
      clienteId: '1',
      numeroSiniestro: 'SIN-2024-001',
      fechaOcurrencia: '2024-03-15T10:30:00',
      fechaDeclaracion: '2024-03-15T14:20:00',
      descripcion: 'Accidente de tráfico en intersección...',
      lugar: 'Av. Principal con Calle Segunda, Santiago',
      estado: 'En Revisión',
      documentos: [
        {
          id: '1',
          nombre: 'Parte Policial.pdf',
          tipo: 'Denuncia',
          url: '/documentos/parte-policial.pdf',
          fechaSubida: '2024-03-15T14:30:00'
        }
      ],
      comentarios: [
        {
          id: '1',
          texto: 'Siniestro registrado, pendiente de revisión por el equipo técnico.',
          fecha: '2024-03-15T14:35:00',
          usuario: 'Sistema'
        }
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Siniestros</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
          <Plus className="h-5 w-5" />
          <span>Nuevo Siniestro</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar siniestros..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Documentación Pendiente">Documentación Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Pagado">Pagado</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº Siniestro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Póliza
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
              {siniestros.map((siniestro) => (
                <tr key={siniestro.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {siniestro.numeroSiniestro}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(siniestro.fechaOcurrencia), 'PPP', { locale: es })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(siniestro.fechaOcurrencia), 'HH:mm')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">POL-2024-001</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${siniestro.estado === 'Aprobado' ? 'bg-green-100 text-green-800' :
                        siniestro.estado === 'Rechazado' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {siniestro.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}