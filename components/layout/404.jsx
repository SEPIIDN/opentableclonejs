import React from 'react';

export default function Custom404() {
  return (
    <div class='bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center'>
      <div class='bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl'>
        <p class='text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4'>
          Restaurant Not Found
        </p>
        <p class='text-gray-500 mt-4 pb-4 border-b-2 text-center capitalize'>
          Sorry, the the restaurant you are
          looking for could not be found.
        </p>
      </div>
    </div>
  );
}
