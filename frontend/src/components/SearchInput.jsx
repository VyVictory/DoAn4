import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchInput = ({ onClick }) => {
  return (
    <div className='bg-gray-100 border-gray-200 flex items-center rounded-3xl'>
      <button
        className="flex items-center justify-center h-10 w-10"
        onClick={onClick}
      >
        <MagnifyingGlassIcon className="h-6 w-6 stroke-blue-500 fill-transparent" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="hidden 
        w-56
        md:block px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-transparent border-none "
      />
    </div>
  );
};

export default SearchInput;