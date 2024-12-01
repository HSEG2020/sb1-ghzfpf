import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Siniestro, Cliente, Poliza, TipoDocumento } from '../../types';
import { generarPlantillaSolicitud } from '../../utils/emailTemplates';

interface EnviarSolicitudModalProps {
  siniestro: Siniestro;
  cliente: Cliente;
  poliza: Poliza;
  documentosRequeridos: TipoDocumento[];
  onClose: () => void;
}

export default function EnviarSolicitudModal({
  siniestro,
  cliente,
  poliza,
  documentosRequeridos,
  onClose
}: EnviarSolicitudModalProps) {
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  const plantillaSolicitud = generarPlantillaSolicitud(
    siniestro,
    cliente,
    poliza,
    documentosRequeridos
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      // Aquí iría la lógica para enviar el email
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      toast.success('Solicitud de documentos enviada exitosamente');
      onClose();
    } catch (error) {
      toast.error('Error al enviar la solicitud de documentos');
      console.error('Error:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Enviar Solicitud de Documentos
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Vista Previa del Email
            </h4>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: plantillaSolicitud }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email del Cliente
              </label>
              <input
                type="email"
                value={cliente.email}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mensaje Adicional (opcional)
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Añade un mensaje personalizado..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                disabled={enviando}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 flex items-center space-x-2"
              >
                {enviando ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Enviar Solicitud</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}