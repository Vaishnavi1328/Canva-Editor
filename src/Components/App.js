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
    let i=0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 50, 50, 300, 200);
      };
      img.src = image;
    }
    
    //spliting inputText
    const lines = [];

    while (i < inputText.length) {
        const end = i + 30;
        const line = end > inputText.length ? inputText.substring(i) : inputText.substring(i, end);

        const lastSpace = line.lastIndexOf(' ');
        if (lastSpace !== -1 && end < inputText.length) {
            lines.push(line.substring(0, lastSpace));
            i += lastSpace + 1;
        } else {
            lines.push(line);
            i = end;
        }
    }


    ctx.fillStyle = "black";
    ctx.font = "16px candara";

    if(lines.length>0){
      ctx.fillText(lines[0], 20, 300);
    }

    if(lines.length>1){
      ctx.fillText(lines[1],20,320);
    }

    if(lines.length>2){
      ctx.fillText(lines[2],20,340);
    }

    ctx.fillText(ctaText, 300, 300);

    ctx.strokeStyle = "black"; 
    ctx.lineWidth = 2; 
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
    const { value } = event.target;
    if (value.length <= 10) {
      setCtaText(value); 
    } else {
      setCtaText(value.slice(0, 10));
    }
  };

  const handleColorPickerClick = () => {
    colorPickerRef.current.click();
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);

    // Clone the selected color 
    const updatedColors = [...recentColors.slice(0, 4)];
    updatedColors.unshift(selectedColor);
    setRecentColors(updatedColors);
  };

  const handleRecentColorClick = (selectedColor) => {
    setColor(selectedColor);
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
          <p style={{display:'inline',marginLeft:"20px"}}>Change the add creative image. </p>
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
export default App;
