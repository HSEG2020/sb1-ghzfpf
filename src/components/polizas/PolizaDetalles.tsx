import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Mail, Download, ArrowLeft } from 'lucide-react';
import { Poliza, Cliente } from '../../types';
import { formatUF } from '../../utils/currency';
import EnviarPolizaModal from './EnviarPolizaModal';

interface PolizaDetallesProps {
  poliza: Poliza;
  cliente: Cliente;
  onBack: () => void;
}

export default function PolizaDetalles({ poliza, cliente, onBack }: PolizaDetallesProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Mail className="h-5 w-5 mr-2" />
            Enviar por Email
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Download className="h-5 w-5 mr-2" />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Póliza {poliza.numeroPoliza}
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Información del Cliente
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Nombre:</span>{' '}
                {cliente.nombre} {cliente.apellidos}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">DNI:</span> {cliente.dni}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {cliente.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Teléfono:</span> {cliente.telefono}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Detalles de la Póliza
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Compañía:</span>{' '}
                {poliza.compania.nombre}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Ramo:</span>{' '}
                {poliza.ramoSeguro.nombre}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Prima Anual:</span>{' '}
                {formatUF(poliza.primaAnualUF)} UF
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Forma de Pago:</span>{' '}
                {poliza.formaPago}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Vigencia</h3>
          <div className="grid grid-cols-2 gap-6">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Inicio:</span>{' '}
              {format(new Date(poliza.fechaInicio), 'dd MMMM yyyy', {
                locale: es,
              })}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Vencimiento:</span>{' '}
              {format(new Date(poliza.fechaVencimiento), 'dd MMMM yyyy', {
                locale: es,
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Coberturas</h3>
          <ul className="list-disc list-inside space-y-2">
            {poliza.coberturas.map((cobertura) => (
              <li key={cobertura} className="text-sm text-gray-600">
                {cobertura}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showEmailModal && (
        <EnviarPolizaModal
          poliza={poliza}
          cliente={cliente}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}