import React from 'react';
import { ShoppingBag, User as UserIcon, LogOut, Menu, X, LayoutDashboard, Package } from 'lucide-react';
import { AppView, User, CartItem } from '../types';

interface NavbarProps {
  user: User | null;
  cartItemCount: number;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  currentView: AppView;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  cartItemCount,
  onNavigate,
  onLogout,
  currentView
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">SoleMates</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate(AppView.HOME)} 
              className={`text-sm font-medium transition-colors ${currentView === AppView.HOME ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Shop
            </button>
            
            {user?.role === 'admin' && (
              <button 
                onClick={() => onNavigate(AppView.ADMIN_DASHBOARD)} 
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${currentView === AppView.ADMIN_DASHBOARD ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
            )}

            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
              <button 
                onClick={() => onNavigate(AppView.CART)} 
                className="relative p-2 text-gray-500 hover:text-black transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onNavigate(AppView.ORDER_HISTORY)}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 ${currentView === AppView.ORDER_HISTORY ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    <Package size={16} />
                    My Orders
                  </button>
                  <div className="text-sm font-medium text-gray-700">Hi, {user.name}</div>
                  <button onClick={onLogout} className="text-gray-400 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onNavigate(AppView.LOGIN)} 
                  className="text-sm font-medium text-gray-900 hover:text-gray-600"
                >
                  Log In
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
             <button 
                onClick={() => onNavigate(AppView.CART)} 
                className="relative p-2 mr-4 text-gray-500 hover:text-black transition-colors"
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-gray-500 hover:text-black"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <button 
              onClick={() => { onNavigate(AppView.HOME); setIsMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md"
            >
              Shop
            </button>
            {user?.role === 'admin' && (
              <button 
                onClick={() => { onNavigate(AppView.ADMIN_DASHBOARD); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Admin Dashboard
              </button>
            )}
            {user ? (
               <>
                 <button 
                  onClick={() => { onNavigate(AppView.ORDER_HISTORY); setIsMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md"
                >
                  My Orders
                </button>
                 <button 
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                  Log Out
                </button>
               </>
            ) : (
              <button 
                onClick={() => { onNavigate(AppView.LOGIN); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};