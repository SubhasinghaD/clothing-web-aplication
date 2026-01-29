import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';  // Adjust path according to your folder structure

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      
      setRelated(filteredProducts.slice(0, 5));
      console.log(filteredProducts.slice(0, 5)); // Debugging step
    }
  }, [products, category, subCategory]);

  return (
    <div>
      <div className='my-2'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={" PRODUCTS"}/>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 lg:grid-cols-5 gap-y-6">
        {related.length > 0 ? (
          related.map((item, index) => (
            <div 
              key={index._id} 
              className="p-4 border rounded-lg shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
            >
              <img
                src={item.image[0]} 
                alt={item.name}
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="mt-2 text-xl font-semibold">
                LKR {item.price.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No related products found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;

