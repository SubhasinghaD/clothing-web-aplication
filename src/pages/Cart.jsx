import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        if (!products || !cartItems) {
          console.log('Products or cartItems not yet available');
          setLoading(false);
          return;
        }

        if (!Array.isArray(products) || typeof cartItems !== 'object') {
          throw new Error('Invalid products or cartItems format');
        }

        console.log('Products:', products);
        console.log('Cart Items:', cartItems);

        const tempData = [];
        for (const itemId in cartItems) {
          for (const size in cartItems[itemId]) {
            if (cartItems[itemId][size] > 0) {
              const product = products.find((p) => p._id === itemId);
              if (product) {
                tempData.push({
                  _id: itemId,
                  size: size,
                  quantity: cartItems[itemId][size],
                });
              } else {
                console.warn(`Product with ID ${itemId} not found in products array`);
              }
            }
          }
        }
        console.log('Processed Cart Data:', tempData);
        setCartData(tempData);
        setError(null);
      } catch (err) {
        console.error('Error in Cart useEffect:', err);
        setError('Failed to load cart. Please refresh the page or try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, [cartItems, products]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-black text-white px-4 py-2"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Your cart is empty. Start shopping!</p>
        <button
          onClick={() => navigate('/collection')}
          className="mt-4 bg-black text-white px-4 py-2"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.map((item) => {
        const productData = products.find((product) => product._id === item._id);
        if (!productData) return null;

        return (
          <div
            key={`${item._id}-${item.size}`}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className="flex items-start gap-6">
              {productData.image?.[0] ? (
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt={productData.name}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/80')}
                />
              ) : (
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200" />
              )}
              <div>
                <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {productData.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                </div>
              </div>
            </div>

            <input
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1) {
                  updateQuantity(item._id, item.size, value);
                }
              }}
              className="border max-w-20 px-1 sm:px-2 py-1"
              type="number"
              min={1}
              value={item.quantity}
            />

            <img
              onClick={() => updateQuantity(item._id, item.size, 0)}
              className="w-4 mr-4 sm:w-5 cursor-pointer"
              src={assets.bin_icon}
              alt="Remove"
            />
          </div>
        );
      })}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;