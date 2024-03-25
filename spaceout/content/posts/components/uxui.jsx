import React, { useEffect, useRef } from 'react';
import ColorPallete from './UxParts/colorPallete/colorPallete';
import Typography from './UxParts/typography/typography';
import './uiStyles.css';

export const UI = ({
  colors,
  primeFontFamily,
  secondaryFontFamily,
  background,
  h1,
  h2,
  body,
  textColor = 'inherit',
  ...props
}) => {
  return (
    <div className="uiuxHolder">
      <ColorPallete colors={colors} />
      <Typography
        color={textColor}
        primeFontFamily={primeFontFamily}
        secondaryFontFamily={secondaryFontFamily}
        background={background}
        h1={h1}
        h2={h2}
        body={body}
        {...props}
      />
    </div>
  );
};

export const GridGallery = ({ images, gridCols = 'auto auto' }) => {
  const observer = useRef();
  const imagesRef = useRef([]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          const src = image.dataset.src;
          image.src = src;
          observer.current.unobserve(image);
        }
      });
    });

    imagesRef.current.forEach((img) => observer.current.observe(img));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const imagesArray = images.map((image, index) => (
    <img
      ref={(el) => (imagesRef.current[index] = el)}
      key={image.src}
      data-src={image.src}
      alt={image.alt}
      className="lazy"
    />
  ));

  return (
    <div
      className="gridGalleryHolder"
      style={{ gridTemplateColumns: gridCols }}
    >
      {imagesArray}
    </div>
  );
};

export default UI;
