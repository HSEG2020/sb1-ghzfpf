import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Building2, 
  BarChart2, 
  Settings, 
  Bell, 
  Briefcase, 
  AlertTriangle,
  DollarSign 
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Users, text: 'Clientes', path: '/clientes' },
    { icon: FileText, text: 'Pólizas', path: '/polizas' },
    { icon: AlertTriangle, text: 'Siniestros', path: '/siniestros' },
    { icon: DollarSign, text: 'Cobranza', path: '/cobranza' },
    { icon: Building2, text: 'Compañías', path: '/companias' },
    { icon: Briefcase, text: 'Ramos', path: '/ramos' },
    { icon: BarChart2, text: 'Estadísticas', path: '/estadisticas' },
    { icon: Bell, text: 'Recordatorios', path: '/recordatorios' },
    { icon: Settings, text: 'Configuración', path: '/configuracion' },
  ];

  return (
    <nav className="w-64 bg-white h-[calc(100vh-4rem)] shadow-lg">
      <div className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}