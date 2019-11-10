import React from 'react'

const FontSetter = ({height = 26, width = 26, fill="white"}) => (
  <svg width={width} height={height} viewBox="0 0 26 26" >
        <path fill="none" d="M0 0h24v24H0V0z" />
    <path fill={fill} d="M9 5.5c0 .83.67 1.5 1.5 1.5H14v10.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h3.5c.83 0 1.5-.67 1.5-1.5S21.33 4 20.5 4h-10C9.67 4 9 4.67 9 5.5zM4.5 12H6v5.5c0 .83.67 1.5 1.5 1.5S9 18.33 9 17.5V12h1.5c.83 0 1.5-.67 1.5-1.5S11.33 9 10.5 9h-6C3.67 9 3 9.67 3 10.5S3.67 12 4.5 12z" />
  </svg>
)

export default FontSetter
