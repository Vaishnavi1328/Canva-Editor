import React, { useState, useRef } from 'react';
//import './ColorPicker.css'; // Assume CSS file for styling

function ColorPicker() {
  const [colors, setColors] = useState([]);
  const colorPickerRef = useRef(null);

  const handleColorPickerClick = () => {
    colorPickerRef.current.click();
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    addColor(color);
  };

  const addColor = (color) => {
    setColors(prevColors => {
      const newColors = [color, ...prevColors.slice(0, 4)];
      return newColors;
    });
  };

  const handleColorItemClick = (color) => {
    // Change to the selected color
    console.log("Selected color:", color);
  };

  return (
    <div className="color-picker-container">
      <button className="color-picker-button" onClick={handleColorPickerClick}>+</button>
      <input type="color" ref={colorPickerRef} onChange={handleColorChange} style={{ display: 'none' }} />
      <div className="color-list">
        {colors.map((color, index) => (
          <div key={index} className="color-box" style={{ backgroundColor: color }} onClick={() => handleColorItemClick(color)}></div>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
