import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image[0]);
      setSelectedSize(foundProduct.sizes && foundProduct.sizes.length > 0 ? foundProduct.sizes[0] : '');
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // Always use the full range of sizes, ignoring product-specific sizes
  const sizesArray = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <div className='text-sm mb-6'>
        <span className='text-gray-500'>Home / Products / {productData.name}</span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Left: Image Gallery */}
        <div className='flex gap-4'>
          <div className='hidden md:flex flex-col gap-4 w-24'>
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${productData.name} view ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer border ${
                  selectedImage === img ? 'border-black' : 'border-gray-200'
                }`}
                onMouseEnter={() => setSelectedImage(img)} 
              />
            ))}
          </div>
          <div className='flex-1'>
            <img
              src={selectedImage}
              alt={productData.name}
              className='w-full h-auto transition-all duration-500 ease-in-out transform hover:scale-110'
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className='flex flex-col gap-6'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{productData.name}</h1>

            <div className='flex items-center gap-1 mb-2'>
              <img src={assets.star_icon} alt="" className="w-4 5" />
              <img src={assets.star_icon} alt="" className="w-4 5" />
              <img src={assets.star_icon} alt="" className="w-4 5" />
              <img src={assets.star_icon} alt="" className="w-4 5" />
              <img src={assets.star_dull_icon} alt="" className="w-4 5" />
              <p className='pl-2'>(122)</p>
            </div>

            <p className='text-2xl font-medium'>LKR {productData.price.toLocaleString()}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className='text-sm font-medium mb-2'>AVAILABLE COLOR: {selectedColor || 'Select Color'}</h3>
            <div className='flex gap-2'>
              {productData.colors?.map((color, index) => (
                <button
                  key={index}
                  className={`w-16 h-16 border ${
                    selectedColor === color ? 'border-black' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <img src={productData.image[0]} alt={color} className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-sm font-medium'>AVAILABLE SIZE: {selectedSize}</h3>
              <button className='text-sm underline'>Size Guide</button>
            </div>
            <div className='grid grid-cols-6 gap-2'>
              {sizesArray.map((size) => (
                <button
                  key={size}
                  className={`py-2 px-4 border ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart(productData._id, selectedSize)}
            className='w-full bg-black text-white py-4 hover:bg-gray-800 transition-colors'
          >
            ADD TO CART
          </button>

          {/* Shipping Info */}
          <div className='flex items-center border-t pt-5'>
            <p className='text-x'>Free shipping on orders over Rs.20,000</p>
          </div>

          {/* Returns Info */}
          <div className='flex items-center border-t pt-5'>
            <p className='text-x'>Free Exchange & Returns</p>
          </div>
        </div>

        {/* Product Details & Size Guide (Collapsible) */}
        <div className='mt-0'>
            <button className='w-full flex justify-between items-center py-2'>
              <span className='font-medium'>Product Details</span>
              <span>+</span>
            </button>
            <button className='w-full flex justify-between items-center py-2'>
              <span className='font-medium'>Size & Fit</span>
              <span>+</span>
            </button>
          </div>
      </div>
      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;