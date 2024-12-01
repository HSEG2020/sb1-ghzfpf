import React from 'react';
import { Users, FileText, TrendingUp, AlertCircle, Building2 } from 'lucide-react';
import { formatUF } from '../utils/currency';

export default function Dashboard() {
  const valorUF = 35842.97; // Ejemplo de valor UF
  const stats = [
    { icon: Users, label: 'Total Clientes', value: '124' },
    { icon: FileText, label: 'Pólizas Activas', value: '287' },
    { icon: TrendingUp, label: 'Prima Total Anual', value: formatUF(8654.32) + ' UF' },
    { icon: Building2, label: 'Compañías', value: '5' },
    { icon: AlertCircle, label: 'Renovaciones Pendientes', value: '8' },
  ];

  const carteraPorCompania = [
    { compania: 'Chilena Consolidada', primaUF: 2543.21 },
    { compania: 'Consorcio', primaUF: 1987.65 },
    { compania: 'Mapfre', primaUF: 1654.32 },
    { compania: 'HDI Seguros', primaUF: 1432.10 },
    { compania: 'BCI Seguros', primaUF: 1037.04 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Cartera por Compañía
          </h3>
          <div className="space-y-4">
            {carteraPorCompania.map((item) => (
              <div key={item.compania} className="flex items-center justify-between">
                <span className="text-gray-600">{item.compania}</span>
                <span className="font-semibold">{formatUF(item.primaUF)} UF</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Próximas Renovaciones
          </h3>
          <div className="space-y-3">
            {/* Lista de renovaciones próximas */}
          </div>
        </div>
      </div>
    </div>
  );
}