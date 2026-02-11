import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) => (prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]));
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) => (prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]));
  };

  useEffect(() => {
    let result = products.filter(
      (product) =>
        (category.length === 0 || category.includes(product.category)) &&
        (subCategory.length === 0 || subCategory.includes(product.subCategory))
    );

    if (showSearch && search) {
      result = result.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [products, category, subCategory, search, showSearch]);

  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Men', 'Women', 'Kids'].map((cat) => (
              <p key={cat} className='flex gap-2'>
                <input className='w-3' type='checkbox' value={cat} onChange={toggleCategory} /> {cat}
              </p>
            ))}
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
              <p key={sub} className='flex gap-2'>
                <input className='w-3' type='checkbox' value={sub} onChange={toggleSubCategory} /> {sub}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1='ALL' text2='COLLECTIONS' />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relavent'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map((product, index) => (
            <Link key={product._id} to={`/product/${product._id}`}>  {/* Wrap each product with Link */}
              <ProductItem
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
