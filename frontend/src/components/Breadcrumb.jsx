import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Breadcrumb = ({ dark }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isDashboard = location.pathname === '/dashboard';
  const isCityView = location.pathname.startsWith('/city/');

  return (
    <div className={`transition-colors duration-300 ${
      dark ? 'text-gray-300' : 'text-black'
    }`}>
      <div className="max-w-6xl mx-auto px-4 pt-3">
        <div className="flex items-center text-sm mb-6">
          <span 
            onClick={() => navigate('/')}
            className={`hover:underline cursor-pointer ${
              dark ? 'hover:text-white' : 'hover:text-black'
            }`}
          >
          </span>
          <span className="mx-2">/</span>
          <span 
            onClick={() => navigate('/dashboard')}
            className={`hover:underline cursor-pointer ${
              isDashboard 
                ? `font-bold ${dark ? 'text-white' : 'text-black'}` 
                : `${dark ? 'hover:text-white' : 'hover:text-black'}`
            }`}
          >
            Dashboard
          </span>
          {isCityView && (
            <>
              <span className="mx-2">/</span>
              <span className={`font-bold ${
                dark ? 'text-white' : 'text-black'
              }`}>
                City Weather
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
