import React, { useState, useRef, useEffect } from 'react';
import './style.css';

function App() {
  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [color, setColor] = useState("lightblue");
  const [recentColors, setRecentColors] = useState([]);
  const canvasRef = useRef(null);
  const colorPickerRef = useRef(null);

  // Update canvas whenever state variables change
  useEffect(() => {
    updateCanvas();
  }, [image, inputText, ctaText, color, recentColors]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
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

    if (image) {
      const img = new Image();
      img.onload = () => {
        drawRoundedRect(ctx,50,50,300,200,10);
        ctx.drawImage(img, 50, 50, 300, 200);
      };
      img.src = image;
    }

    ctx.fillStyle = "black";
    ctx.font = "12px sans-serif";
    ctx.fillText(inputText, 10, 300);

    ctx.fillText(ctaText, 300, 300 );
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

  const drawRoundedRect = (ctx, x, y, width, height, borderRadius) => {
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
    ctx.closePath();
    //ctx.clip();
  };

  return (
    <div id="editor">
      <div id="canvas-area" class="half">
        <canvas ref={canvasRef} id="canvas" height="400" width="400"></canvas>
      </div>
      <div id="editor-area" class="half">
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
    </div>
  );
}

export default App;
