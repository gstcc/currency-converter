import React, { useState, useEffect } from 'react';
import { currencies } from '../constants';
import "./search.css"

const SearchBar = ({ placeholder, onSearchChange, sender, swap, currencyToSwap }) => {
  // State to keep track of the current search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // State to control whether to show the options list
  const [showOptions, setShowOptions] = useState(false);

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setShowOptions(value.length > 0); // Show options only if the search term is not empty
  };

  // Function to handle clicks on the options list
  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setShowOptions(false); // Hide the options after clicking on one
    onSearchChange({ option, sender }); // Notify the parent component of the search term change
  };

  // Update searchTerm based on currencyToSwap when swap changes
  useEffect(() => {
    if (swap) {
      setSearchTerm(currencyToSwap);
    }
  }, [swap, currencyToSwap]);

  // Filter the options based on the current search term
  const filteredOptions = currencies.filter(option =>
    option.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className='searchBar'>
      {/* Input field for search */}
      <input
        className='search'
        type="text"
        placeholder={placeholder.data}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* Options list */}
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
