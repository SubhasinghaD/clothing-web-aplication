import React from 'react';
import Title from '../components/Title'; // Fixed import path
import { assets } from '../assets/assets'; // Ensure assets is imported
import NewsletterBox from '../components/NewsletterBox'; // Ensure NewsletterBox is imported

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p> {/* Fixed text-x1 to text-xl */}
          <p className='text-gray-500'>Faculty of Engineering <br /> Hapugala, Galle, Sri Lanka</p> {/* Fixed "Faculy" to "Faculty" */}
          <p className='text-gray-500'>Tel: +94 70 602 2001 <br /> Email: admin@gaze.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at GAZE</p> {/* Fixed "font-semibolt" to "font-semibold" */}
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
