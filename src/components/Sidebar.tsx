// import { NavLink } from 'react-router';
// import { LayoutDashboard, Package, Tags, Users, ClipboardList, ShoppingCart, LogOut } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// export const Sidebar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <h1 className="text-xl font-bold text-gray-800">Inventory System</h1>
//       </div>

//       <nav className="flex-1 p-4">
//         <ul className="space-y-2">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-lg ${
//                   isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
//                 }`
//               }
//             >
//               <LayoutDashboard size={20} />
//               <span>Dashboard</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/produtos"
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-lg ${
//                   isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
//                 }`
//               }
//             >
//               <Package size={20} />
//               <span>Produtos</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/categorias"
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-lg ${
//                   isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
//                 }`
//               }
//             >
//               <Tags size={20} />
//               <span>Categorias</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/clientes"
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-lg ${
//                   isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
//                 }`
//               }
//             >
//               <Users size={20} />
//               <span>Clientes</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/inventario"
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-lg ${
//                   isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
//                 }`
//               }
//             >
//               <ClipboardList size={20} />
//               <span>Inventário</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/vendas"
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-lg ${
//                   isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
//                 }`
//               }
//             >
//               <ShoppingCart size={20} />
//               <span>Vendas</span>
//             </NavLink>
//           </li>
//         </ul>
//       </nav>

//       <div className="p-4 border-t border-gray-200">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             {user?.name.charAt(0)}
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//             <p className="text-xs text-gray-500">{user?.email}</p>
//           </div>
//         </div>
//         <button
//           onClick={logout}
//           className="mt-4 w-full flex items-center justify-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
//         >
//           <LogOut size={18} />
//           <span>Sair</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

import { NavLink, Outlet } from 'react-router';
import { LayoutDashboard, Package, Tags, Users, ClipboardList, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Inventory System</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Package size={20} />
                <span>Produtos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categorias"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Tags size={20} />
                <span>Categorias</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clientes"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Users size={20} />
                <span>Clientes</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inventario"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <ClipboardList size={20} />
                <span>Inventário</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vendas"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <ShoppingCart size={20} />
                <span>Vendas</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}