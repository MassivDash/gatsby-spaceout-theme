import React from 'react';

const YouTubeIcon = ({fill = 'white'}) => (
  <svg
    width="17"
    height="12"
    viewBox="0 0 17 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1515 0.364084C15.8797 0.560129 16.4538 1.13426 16.6498 1.86243C17.0139 3.19274 16.9999 5.96538 16.9999 5.96538C16.9999 5.96538 16.9999 8.72402 16.6498 10.0543C16.4538 10.7825 15.8797 11.3566 15.1515 11.5527C13.8212 11.9028 8.49996 11.9028 8.49996 11.9028C8.49996 11.9028 3.19274 11.9028 1.84843 11.5387C1.12026 11.3426 0.546126 10.7685 0.350081 10.0403C0 8.72401 0 5.95138 0 5.95138C0 5.95138 0 3.19274 0.350081 1.86243C0.546126 1.13426 1.13426 0.546126 1.84843 0.350081C3.17873 0 8.49996 0 8.49996 0C8.49996 0 13.8212 0 15.1515 0.364084ZM6.80549 3.40298L11.2305 5.95157L6.80549 8.50016V3.40298Z"
      fill={fill}
    />
  </svg>
);

export default YouTubeIcon;
