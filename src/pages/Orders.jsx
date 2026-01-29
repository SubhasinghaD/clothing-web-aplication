import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'; // Assuming Title is imported from here

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  // Sample order data (replace with real order data if available)
  const sampleOrders = products.slice(1, 4).map((product) => ({
    ...product,
    quantity: 1,
    size: 'M',
    status: 'Ready to ship',
    date: '05, Feb, 2025',
  }));

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {sampleOrders.length === 0 ? (
        <div className="text-center py-10">
          <p>No orders found.</p>
        </div>
      ) : (
        <div>
          {sampleOrders.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.image[0]}
                  alt={item.name}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/80')}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">{item.date}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;