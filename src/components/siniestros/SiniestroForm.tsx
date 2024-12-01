import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Poliza, TipoDocumento } from '../../types';

interface SiniestroFormProps {
  poliza: Poliza;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function SiniestroForm({ poliza, onClose, onSubmit }: SiniestroFormProps) {
  const [documentos, setDocumentos] = useState<File[]>([]);
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('Denuncia');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de envío
    onSubmit({
      // datos del formulario
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentos([...documentos, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Nuevo Siniestro - Póliza {poliza.numeroPoliza}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Ocurrencia
              </label>
              <input
                type="datetime-local"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                max={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lugar del Siniestro
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Dirección donde ocurrió el siniestro"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción del Siniestro
            </label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe detalladamente cómo ocurrió el siniestro..."
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Documentación
            </label>
            
            <div className="flex items-center space-x-4">
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value as TipoDocumento)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Denuncia">Denuncia</option>
                <option value="Presupuesto">Presupuesto</option>
                <option value="Factura">Factura</option>
                <option value="Informe">Informe</option>
                <option value="Fotografía">Fotografía</option>
                <option value="Otro">Otro</option>
              </select>
              
              <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                <Upload className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Subir archivo</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {documentos.length > 0 && (
              <ul className="mt-4 divide-y divide-gray-200">
                {documentos.map((doc, index) => (
                  <li key={index} className="py-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => setDocumentos(documentos.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              Crear Siniestro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}