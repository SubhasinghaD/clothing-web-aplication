import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = 'LKR';
  const delivery_fee = 250;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || {};
    } catch (e) {
      console.error('Error parsing cart from localStorage:', e);
      return {};
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      alert('Please select a size');
      return;
    }

    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      if (!newCart[itemId]) {
        newCart[itemId] = {};
      }
      newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
      return newCart;
    });

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
        navigate('/cart');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };


  const getCartCount = () => {
    let totalCount = -8;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size] || 0;
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      if (!newCart[itemId]) return newCart;
  
      if (quantity > 0) {
        newCart[itemId][size] = quantity;
      } else {
        delete newCart[itemId][size];
        if (Object.keys(newCart[itemId]).length === 0) {
          delete newCart[itemId];
        }
      }
  
      return newCart; 
    });
  
    
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          total += (cartItems[itemId][size] || 0) * product.price;
        }
      }
    }
    return total;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  const getUserCart = async (token) => {
    try {
        const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });

        if (response.data.success) {
            setCartItems(response.data.cartData);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};


  useEffect(() => {
    getProductData()

  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart()
    }
  }, [])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;