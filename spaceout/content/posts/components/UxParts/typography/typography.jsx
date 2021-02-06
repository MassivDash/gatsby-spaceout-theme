import React from 'react';
import './typography.css'

const Typography = ({ primeFontFamily, hasPrimeLight, secondaryFontFamily, hasSecondaryLight, background = '#FFF', h1, h2, body, color, ...rest }) => {


    return (
        <div className="typographyHolder" style={{backgroundColor: background, color: color}}>
            <div className="typographyGrid" >
            <div className="typographyPrime bold" style={{ fontFamily: primeFontFamily }}> 
                <p>Aa</p>
                <p>{primeFontFamily} Bold</p>
            </div>
            <div className="typographyPrime" style={{ fontFamily: primeFontFamily }}> 
                <p>Aa</p>
                <p>{primeFontFamily} Normal</p>
            </div>
            <div className="typographyPrime light" style={{ fontFamily: primeFontFamily }}> 
                <p>Aa</p>
                <p>{primeFontFamily} Light</p>
            </div>
            <div className="typographySecondary bold" style={{ fontFamily: secondaryFontFamily }}> 
                <p>Aa</p>
                <p>{secondaryFontFamily} Bold</p>
            </div>
            <div className="typographySecondary" style={{ fontFamily: secondaryFontFamily }}> 
                <p>Aa</p>
                <p>{secondaryFontFamily} Normal</p>
            </div>
            {
                hasSecondaryLight && (
                    <div className="typographySecondary light" style={{ fontFamily: secondaryFontFamily }}> 
                    <p>Aa</p>
                    <p>{secondaryFontFamily} Light</p>
                    </div>
                )
            }
            </div>
            <div className="typographyHeadingsHolder">
                <p style={h1}>Heading H1</p>
                <p style={h2}>Heading H2</p>
                <p style={body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit tortor velit, non posuere leo hendrerit sit amet. Sed purus felis, blandit ac tristique id, consequat at purus. Nulla eget dignissim erat, eget suscipit velit. In hac habitasse platea dictumst. Curabitur nec laoreet tellus, vitae convallis eros. Morbi accumsan libero vitae venenatis vestibulum. Proin blandit scelerisque nisl eu sagittis. </p>
            </div>
        </div>
    )

}

export default Typography