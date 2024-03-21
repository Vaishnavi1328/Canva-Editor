import React, { useState, useRef, useEffect } from 'react';
import './style.css';

function App3() {
  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [color, setColor] = useState("lightblue");
  const [recentColors, setRecentColors] = useState([]);
  const [borderRadius, setBorderRadius] = useState(10); // Initial border radius
  const canvasRef = useRef(null);
  const colorPickerRef = useRef(null);

  // Update canvas whenever state variables or border radius change
  useEffect(() => {
    updateCanvas();
  }, [image, inputText, ctaText, color, recentColors, borderRadius]);

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
        //drawRoundedRect(ctx, 50, 50, 300, 200, borderRadius); // Use the border radius here
        ctx.drawImage(img, 50, 50, 300, 200);
      };
      img.src = image;
    }

    ctx.fillStyle = "black";
    ctx.font = "16px candara";
    ctx.fillText(inputText, 20, 300);
    ctx.fillText(ctaText, 300, 300);

    ctx.strokeStyle = "black"; // Border color
    ctx.lineWidth = 2; // Border width
    const x = 60;
    const y = 40;
    const width = 300;
    const height = 200;
    const cornerRadius = 10;

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.lineTo(x + width - cornerRadius, y);
    ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
    ctx.lineTo(x + width, y + height - cornerRadius);
    ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

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
    ctx.clip();
  };

  return (
    <div id="editor">
      <div id="canvas-area" className="half">
        <canvas ref={canvasRef} id="canvas" height="400" width="400"></canvas>
      </div>
      <div id="editor-area" className="half">
        <div class="title">
            <h4>Add Customization</h4>
            <p>Customize your ad and get the templates accordingly</p>
        </div>
        <div>
          <p style={{display:'inline'}}>Change the add creative image. </p>
          <label for="imageFileInput" style={{color:'blue',textDecoration:'underline',cursor:'pointer'}}>select file</label>
          <input type="file" id="imageFileInput" className="editor-item" onChange={handleFileSelect} />
        </div>
        <div class="text">
          <p>Ad Content</p>
          <input type="text" id="inputText" className="editor-item" value={inputText} onChange={handleInputChange} />
        </div>
        <div class="text">
          <p>Ad CTA</p>
          <input type="text" id="CTAText" className="editor-item" value={ctaText} onChange={handleCtaChange} />
        </div>
        <div id="color-picker-container">
          <div id="color-list">
            {recentColors.map((recentColor, index) => (
              <div key={index} className="color-box" style={{ backgroundColor: recentColor }} onClick={() => handleRecentColorClick(recentColor)}></div>
            ))}
          </div>
          <button id="color-picker-button" className="editor-item" onClick={handleColorPickerClick}>+</button>
          <input type="color" id="color-picker" style={{ display: 'none' }} value={color} onChange={handleColorChange} ref={colorPickerRef} />
        </div>
      </div>
    </div>
  );
}

export default App3;
