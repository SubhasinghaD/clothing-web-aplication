import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox'; // Ensure NewsletterBox is imported

const About = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="text-center text-2xl pt-12 pb-8 border-t border-gray-200">
        <Title text1={'ABOUT '} text2={' US'} />
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          <strong>Discover who we are and what drives us to deliver excellence every day.</strong>
        </p>
      </div>

      {/* Main Content */}
      <div className="my-12 px-4 md:px-8 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
        <div className="w-full md:w-1/2">
          <img
            className="w-full max-w-[450px] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            src={assets.about_img}
            alt="About Us"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/450')}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-gray-900">Gaze.com</span>! We’re passionate about crafting the ultimate shopping experience tailored just for you.
          </p>
          <p className="text-lg leading-relaxed">
            Thank you for choosing us. Our commitment is to bring you top-notch products and a seamless journey from start to finish.
          </p>
          <div>
            <b className="text-xl text-gray-900">Our Mission</b>
            <p className="mt-2 text-lg leading-relaxed">
              To deliver high-quality products paired with exceptional service, ensuring every customer feels valued and satisfied.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center px-4 md:px-8 py-12 bg-white">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <div className="mt-10 flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assurance</h3>
            <p className="text-gray-600">
              We handpick and rigorously test every product to meet our high standards of excellence.
            </p>
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Convenience</h3>
            <p className="text-gray-600">
              Enjoy a smooth, intuitive shopping experience with our easy-to-use platform.
            </p>
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exceptional Customer Service</h3>
            <p className="text-gray-600">
              Our dedicated team is always ready to support you, every step of the way.
            </p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;