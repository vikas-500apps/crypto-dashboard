import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComponent } from '../features/layoutSlice';

const AddComponentDropdown = ({ theme }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddComponent = (type) => {
    dispatch(addComponent({
      id: `${type}-${Date.now()}`,
      type,
      order: Date.now(),
    }));
    setIsOpen(false); // Close the dropdown after selection
  };

  // Button class based on theme
  const dropdownClass = `px-4 py-2 mb-4 rounded focus:outline-none ${
    theme === 'dark'
      ? 'bg-gray-700 text-gray-300'
      : 'bg-gray-200 text-black'
  } transition-all duration-200`;

  // Dropdown item class based on theme
  const dropdownItemClass = `block px-4 py-2 w-full hover:${
    theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
  } transition-all duration-200`;

  // Dropdown container class based on theme
  const dropdownContainerClass = `absolute mt-2 w-48 z-10 shadow-lg rounded-md ${
    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-black'
  }`;

  return (
    <div className="mt-4 relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={dropdownClass}
      >
        Add Component
      </button>
      {isOpen && (
        <div className={dropdownContainerClass}>
          <ul>
            <li>
              <button
                onClick={() => handleAddComponent('table')}
                className={dropdownItemClass}
              >
                Add Table
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAddComponent('graph')}
                className={dropdownItemClass}
              >
                Add Graph
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAddComponent('summary')}
                className={dropdownItemClass}
              >
                Add Summary
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddComponentDropdown;
