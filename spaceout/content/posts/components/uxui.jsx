import React from 'react';
import ColorPallete from './UxParts/colorPallete/colorPallete';
import Typography from './UxParts/typography/typography';
import './uiStyles.css'

export const UI = ({ colors, primeFontFamily, secondaryFontFamily, background, h1, h2, body, textColor = 'inherit'  }) => {

    return (<div className="uiuxHolder">
        <ColorPallete colors={colors} />
        <Typography color={textColor} primeFontFamily={primeFontFamily} secondaryFontFamily={secondaryFontFamily} background={background} h1={h1} h2={h2} body={body} />
    </div>)

}

export const GridGallery = ({ images, gridCols = 'auto auto' }) => {
    
    const imagesArray = images.map(image => <img key={image.src}src={image.src} alt={image.alt} />)
    return (
        <div className="gridGalleryHolder" style={{ gridTemplateColumns: gridCols }}>
            {imagesArray}
        </div>
    )
}

export default UI