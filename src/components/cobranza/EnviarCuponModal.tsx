import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Cuota, Cliente, Poliza } from '../../types';
import { prepararDatosCupon } from '../../utils/pdfGenerator';
import CuponPago from './CuponPago';

interface EnviarCuponModalProps {
  cuota: Cuota;
  cliente: Cliente;
  poliza: Poliza;
  onClose: () => void;
}

export default function EnviarCuponModal({
  cuota,
  cliente,
  poliza,
  onClose
}: EnviarCuponModalProps) {
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  const datosCupon = prepararDatosCupon(cuota, cliente, poliza);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      // Aquí iría la lógica para enviar el email con el cupón
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      toast.success('Cupón de pago enviado exitosamente');
      onClose();
    } catch (error) {
      toast.error('Error al enviar el cupón de pago');
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
            Enviar Cupón de Pago
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <CuponPago data={datosCupon} />
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
                    <span>Enviar Cupón</span>
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