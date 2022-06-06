import React from 'react';

const ArrowUp = ({ height = 26, width = 26, fill = 'white' }) => (
  <svg width={width} height={height} viewBox="0 0 26 26">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path
      fill={fill}
      d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
    />
  </svg>
);

export default ArrowUp;
