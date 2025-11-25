import React, { useState, useMemo } from 'react';
import { Product, CartItem, User, AppView, Order } from './types';
import { MOCK_PRODUCTS, MOCK_ORDERS } from './constants';
import { Navbar } from './components/Layout';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { ShoppingBag, ArrowLeft, Trash2, CreditCard, Lock, Mail, UserPlus, CheckCircle, Package } from 'lucide-react';

// --- Page Components Inline to keep file count reasonable as requested, but separated in structure ---

// ORDER HISTORY PAGE
const OrderHistory: React.FC<{ orders: Order[], onShopNow: () => void }> = ({ orders, onShopNow }) => {
  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">No orders yet</h2>
        <p className="mt-2 text-gray-500 mb-8">When you place an order, it will appear here.</p>
        <button
          onClick={onShopNow}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center border-b border-gray-200 p-4 sm:p-6 bg-gray-50 gap-4 flex-wrap justify-between">
              <div className="flex gap-8">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date placed</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Order number</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total amount</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <li key={`${order.id}-${idx}`} className="p-4 sm:p-6">
                  <div className="flex items-center sm:items-start">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-20 sm:h-20">
                      <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
                    </div>
                    <div className="flex-1 ml-6 text-sm">
                      <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                        <h5>{item.name}</h5>
                        <p className="mt-2 sm:mt-0">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="hidden text-gray-500 sm:block sm:mt-2">Size {item.selectedSize} | Qty {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// LOGIN PAGE
const Login: React.FC<{ onLogin: (u: User) => void, onSwitch: () => void }> = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    const isAdmin = email.includes('admin');
    onLogin({
      id: '123',
      name: isAdmin ? 'Admin User' : 'John Doe',
      email,
      role: isAdmin ? 'admin' : 'user'
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or <button onClick={onSwitch} className="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address (use 'admin' for dashboard)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SIGNUP PAGE
const SignUp: React.FC<{ onLogin: (u: User) => void, onSwitch: () => void }> = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ id: '123', name: 'New User', email, role: 'user' });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account? <button onClick={onSwitch} className="font-medium text-indigo-600 hover:text-indigo-500">Log in</button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
               <label htmlFor="name" className="sr-only">Full Name</label>
              <input id="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlus className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />
            </span>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

// CART PAGE
const Cart: React.FC<{ items: CartItem[], onUpdateQty: (id: string, q: number) => void, onRemove: (id: string) => void, onCheckout: () => void }> = ({ items, onUpdateQty, onRemove, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <ShoppingBag className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Looks like you haven't added any shoes yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={`${item.id}-${item.selectedSize}`} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                </div>
                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <span className="font-medium text-gray-700 hover:text-gray-800">{item.name}</span>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{item.category}</p>
                        <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">Size {item.selectedSize}</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <select
                        value={item.quantity}
                        onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <div className="absolute top-0 right-0">
                        <button onClick={() => onRemove(item.id)} className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 mt-16 lg:mt-0 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-base font-medium text-gray-900">Order total</div>
              <div className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={onCheckout}
              className="w-full bg-black border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// CHECKOUT PAGE
const Checkout: React.FC<{ onComplete: () => void, onBack: () => void, total: number }> = ({ onComplete, onBack, total }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(onComplete, 3000); // Trigger completion after 3s
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Order Confirmed!</h2>
        <p className="mt-2 text-gray-500">Thank you for your purchase. We're preparing your order.</p>
        <p className="mt-4 text-sm text-gray-400">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-black mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cart
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Card number</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input type="text" required className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0000 0000 0000 0000" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="MM / YY" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVC</label>
                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="CVC" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <p className="text-lg font-medium text-gray-900">Total: ${total.toFixed(2)}</p>
          <button
            type="submit"
            disabled={isProcessing}
            className={`bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Navigation Handlers
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    // Redirect logic: if admin, go to dashboard, else home
    if (u.role === 'admin') {
      setCurrentView(AppView.ADMIN_DASHBOARD);
    } else {
      setCurrentView(AppView.HOME);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(AppView.HOME);
    setCart([]);
  };

  const addToCart = (product: Product, size: number) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id && p.selectedSize === size);
      if (existing) {
        return prev.map(p => p.id === product.id && p.selectedSize === size ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const updateCartQty = (id: string, qty: number) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleCheckoutComplete = () => {
    // Create new order
    if (cart.length > 0) {
      const newOrder: Order = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`,
        userId: user?.id || 'guest',
        date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD format
        total: cart.reduce((acc, i) => acc + (i.price * i.quantity), 0),
        status: 'Processing',
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          selectedSize: item.selectedSize
        }))
      };
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
    }
    
    // If logged in, go to orders, else go home
    if (user) {
      setCurrentView(AppView.ORDER_HISTORY);
    } else {
      setCurrentView(AppView.HOME);
    }
  };

  const cartItemCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  // View Routing
  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <Home 
            products={products} 
            onProductClick={(p) => { setSelectedProduct(p); setCurrentView(AppView.PRODUCT_DETAILS); }} 
            onAddToCart={addToCart}
          />
        );
      case AppView.PRODUCT_DETAILS:
        return selectedProduct ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
             <button onClick={() => handleNavigate(AppView.HOME)} className="flex items-center text-gray-500 hover:text-black mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
              </button>
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-center object-cover rounded-lg sm:rounded-lg" />
                </div>
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{selectedProduct.name}</h1>
                  <div className="mt-3">
                    <p className="text-3xl text-gray-900">${selectedProduct.price}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="sr-only">Description</h3>
                    <p className="text-base text-gray-700">{selectedProduct.description}</p>
                  </div>
                  <div className="mt-8">
                     <button
                        onClick={() => { addToCart(selectedProduct, selectedProduct.sizes[0]); handleNavigate(AppView.CART); }}
                        className="w-full bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Add to Cart
                      </button>
                  </div>
                </div>
              </div>
          </div>
        ) : <Home products={products} onProductClick={(p) => { setSelectedProduct(p); setCurrentView(AppView.PRODUCT_DETAILS); }} onAddToCart={addToCart} />;
      case AppView.CART:
        return <Cart items={cart} onRemove={removeFromCart} onUpdateQty={updateCartQty} onCheckout={() => handleNavigate(AppView.CHECKOUT)} />;
      case AppView.CHECKOUT:
        return <Checkout onComplete={handleCheckoutComplete} onBack={() => handleNavigate(AppView.CART)} total={cart.reduce((acc, i) => acc + (i.price * i.quantity), 0)} />;
      case AppView.LOGIN:
        return <Login onLogin={handleLogin} onSwitch={() => handleNavigate(AppView.SIGNUP)} />;
      case AppView.SIGNUP:
        return <SignUp onLogin={handleLogin} onSwitch={() => handleNavigate(AppView.LOGIN)} />;
      case AppView.ADMIN_DASHBOARD:
        return user?.role === 'admin' ? <AdminDashboard products={products} onAddProduct={handleAddProduct} /> : <div className="p-8 text-center text-red-500">Access Denied</div>;
      case AppView.ORDER_HISTORY:
        // Filter orders for current user. Mock data has userId '123' which matches the mock login.
        const userOrders = orders.filter(o => o.userId === user?.id);
        return <OrderHistory orders={userOrders} onShopNow={() => handleNavigate(AppView.HOME)} />;
      default:
        return <Home products={products} onProductClick={(p) => { setSelectedProduct(p); setCurrentView(AppView.PRODUCT_DETAILS); }} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        user={user} 
        cartItemCount={cartItemCount} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
        currentView={currentView}
      />
      <main>
        {renderView()}
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-gray-400 hover:text-gray-500 cursor-pointer">Instagram</span>
            <span className="text-gray-400 hover:text-gray-500 cursor-pointer">Twitter</span>
            <span className="text-gray-400 hover:text-gray-500 cursor-pointer">GitHub</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2024 SoleMates, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}