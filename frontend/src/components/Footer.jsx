import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-6 text-center">
          {/* <h2 className="text-2xl font-bold text-purple-600 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Prescripto</h2> */}
          {/* <p className="max-w-2xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Your health is our priority. At Prescripto, we provide a seamless way to book appointments with qualified healthcare professionals. 
            Access reliable information and connect with experts for all your healthcare needs.
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          <div>
            <h5 className="font-semibold text-lg text-purple-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>COMPANY</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Home</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>About Us</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Services</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg text-purple-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>GET IN TOUCH</h5>
            <p className="mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Phone: <span className="font-light">+0-000-000-000</span></p>
            <p style={{ fontFamily: 'Roboto, sans-serif' }}>Email: <span className="font-light">info@healthconnect.com</span></p>
          </div>

          <div>
            <h5 className="font-semibold text-lg text-purple-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>FOLLOW US</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Facebook</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Twitter</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Instagram</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>LinkedIn</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg text-purple-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>SUPPORT</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Help Center</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <p className="text-center text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
            &copy; 2024 Prescripto. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

