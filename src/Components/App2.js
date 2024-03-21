import React, { useState, useRef, useEffect } from 'react';
import './style.css';

function App2() {
  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [color, setColor] = useState("lightblue");
  const [recentColors, setRecentColors] = useState([]);
  const [imageData, setImageData] = useState(null);
  const canvasRef = useRef(null);
  const colorPickerRef = useRef(null);

  // Update canvas whenever state variables change
  useEffect(() => {
    updateCanvas();
  }, [imageData, inputText, ctaText, color, recentColors]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageData(event.target.result);
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (imageData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 50, 50, 200, 100);
      };
      img.src = imageData;
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(inputText, 50, 200);
    ctx.fillText(ctaText, 50, 250);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCtaChange = (event) => {
    setCtaText(event.target.value);
  };

  const handleColorPickerClick = () => {
    colorPickerRef.current.click();
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);

    // Clone the selected color to ensure each color box holds a unique color value
    const updatedColors = [...recentColors.slice(0, 4)];
    updatedColors.unshift(selectedColor);
    setRecentColors(updatedColors);
  };

  const handleRecentColorClick = (selectedColor) => {
    setColor(selectedColor);
  };

  return (
    <div id="editor">
      <div id="editor-area">
        <div>
          <input type="file" id="imageFileInput" className="editor-item" onChange={handleFileSelect} />
        </div>
        <div>
          <input type="text" id="inputText" className="editor-item" value={inputText} onChange={handleInputChange} />
        </div>
        <div>
          <input type="text" id="CTAText" className="editor-item" value={ctaText} onChange={handleCtaChange} />
        </div>
        <div id="color-picker-container">
          <button id="color-picker-button" className="editor-item" onClick={handleColorPickerClick}>+</button>
          <div id="color-list">
            {recentColors.map((recentColor, index) => (
              <div key={index} className="color-box" style={{ backgroundColor: recentColor }} onClick={() => handleRecentColorClick(recentColor)}></div>
            ))}
          </div>
          <input type="color" id="color-picker" style={{ display: 'none' }} value={color} onChange={handleColorChange} ref={colorPickerRef} />
        </div>
      </div>
      <div id="canvas-area">
        <canvas ref={canvasRef} id="canvas" height="500" width="500"></canvas>
      </div>
    </div>
  );
}

export default App2;
