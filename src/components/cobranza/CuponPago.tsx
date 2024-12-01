import React from 'react';
import { Shield } from 'lucide-react';
import { CuponPagoData } from '../../utils/pdfGenerator';
import { formatUF, formatCLP } from '../../utils/currency';

interface CuponPagoProps {
  data: CuponPagoData;
}

export default function CuponPago({ data }: CuponPagoProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 border border-gray-200">
      {/* Encabezado */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">GestorSeguros Pro</h1>
            <p className="text-sm text-gray-500">Cupón de Pago</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Nº Póliza</p>
          <p className="text-lg font-semibold">{data.numeroPoliza}</p>
        </div>
      </div>

      {/* Datos del Cliente */}
      <div className="mt-6">
        <h2 className="text-sm font-medium text-gray-700">Datos del Cliente</h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nombre Completo</p>
            <p className="font-medium">
              {data.cliente.nombre} {data.cliente.apellidos}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">DNI</p>
            <p className="font-medium">{data.cliente.dni}</p>
          </div>
        </div>
      </div>

      {/* Datos del Pago */}
      <div className="mt-6">
        <h2 className="text-sm font-medium text-gray-700">Datos del Pago</h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Cuota Nº</p>
            <p className="font-medium">{data.cuota.numero}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha Vencimiento</p>
            <p className="font-medium">{data.cuota.fechaVencimiento}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monto UF</p>
            <p className="font-medium">{formatUF(data.cuota.montoUF)} UF</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monto CLP</p>
            <p className="font-medium">{formatCLP(data.cuota.montoCLP)}</p>
          </div>
        </div>
      </div>

      {/* Código de Barras */}
      <div className="mt-8 border-t pt-6">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Código de Pago</p>
          <div className="bg-gray-100 p-4 inline-block rounded">
            <p className="font-mono text-sm">{data.codigoBarras}</p>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Este cupón es válido hasta la fecha de vencimiento indicada</p>
        <p>Conserve este comprobante como respaldo de su pago</p>
      </div>
    </div>
  );
}