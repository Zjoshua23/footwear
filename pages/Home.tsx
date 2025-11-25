import React, { useState } from 'react';
import { Product, AppView } from '../types';
import { Plus, Check, Filter } from 'lucide-react';

interface HomeProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, size: number) => void;
}

export const Home: React.FC<HomeProps> = ({ products, onProductClick, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // Default to first size for quick add
    onAddToCart(product, product.sizes[0]);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Step Into the Future
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Premium footwear designed for performance, comfort, and unmatched style.
        </p>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${selectedCategory === cat 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group relative cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200
                    ${addedItems[product.id] ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-black hover:text-white'}
                  `}
                >
                  {addedItems[product.id] ? <Check size={18} /> : <Plus size={18} />}
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
