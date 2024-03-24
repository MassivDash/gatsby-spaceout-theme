import React from 'react';
import './colorPalleteStyles.css';

const ColorItem = ({ color }) => {
  const smallBoxesArray = [...Array(5)].map((item, index) => (
    <div
      key={index}
      className="palleteSmallBox"
      style={{ backgroundColor: `${color}${50 + 10 * index}` }}
    ></div>
  ));
  return (
    <>
      <div
        title={`color hex ${color}`}
        style={{ backgroundColor: color }}
        className="palleteColor"
      ></div>
      <div className="palleteSmallBoxHolder">{smallBoxesArray}</div>
    </>
  );
};

const ColorPallete = ({ colors }) => {
  const colorsArray = colors.map((color) => (
    <div key={color} className="palleteHolder">
      <ColorItem color={color} />
      <p>{color}</p>
    </div>
  ));
  return <div className="palleteGrid">{colorsArray}</div>;
};

export default ColorPallete;
