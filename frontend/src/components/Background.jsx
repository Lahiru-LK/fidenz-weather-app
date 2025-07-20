import React from 'react';

const Background = ({ dark, isLoaded, children }) => {
  return (
    <div className={`flex-grow flex flex-col relative transition-all duration-500 mb-2 ${dark

      } ${isLoaded ? 'bg-morph-dashboard' : ''}`}>
      <div
        className="absolute inset-0 bg-opacity-100-z-10 "
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/backcloud.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="flex-grow flex flex-col">{children}</div>
    </div>
  );
};


export default Background;
