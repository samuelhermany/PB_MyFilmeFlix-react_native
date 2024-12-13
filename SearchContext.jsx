// SearchContext.js
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
   const [searchQuery, setSearchQuery] = useState('');
   const [searchScope, setSearchScope] = useState(''); // Ex: 'Top Movies', 'Em Cartaz'

   return (
      <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchScope, setSearchScope }}>
         {children}
      </SearchContext.Provider>
   );
};
