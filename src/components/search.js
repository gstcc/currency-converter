import React, { useState } from 'react';
import { currencies } from '../constants';
import "./search.css"

const SearchBar = ( {placeholder, onSearchChange, sender, currency } ) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setShowOptions(value.length > 0); // Show options only if the search term is not empty
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setShowOptions(false); // Hide the options after clicking on one
    onSearchChange({option, sender});
  };

  const filteredOptions = currencies.filter(option =>
    option.toLowerCase().startsWith(searchTerm.toLowerCase())
  );


  return (
    <div className='searchBar'>
      <input className='search'
        type="text"
        placeholder={placeholder.data}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="option-list">
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
