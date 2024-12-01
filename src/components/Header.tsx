import React from 'react';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8" />
          <h1 className="text-2xl font-bold">GestorSeguros Pro</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Bienvenido, Admin</span>
          <button className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}