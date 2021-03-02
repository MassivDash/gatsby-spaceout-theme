import React from 'react'
import Lottie from 'lottie-react-web'
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph'
import Headings from 'gatsby-theme-spaceout/src/components/Headings'
import styled from '@emotion/styled'

const TitleWithLottie = ({ text, title, lottie, column }) => {
  return (
    <FlexHolder>
      <HalfScreen>

        {!column && (
          <>
            <Headings.H2 style={{ margin: '50px auto 35px' }}>{title}</Headings.H2>
            <Paragraph style={{ margin: '40px 0px' }}>{text}</Paragraph>
          </>
        )}
      </HalfScreen>
      <HalfScreen>
        {column && (
          <>
            <Headings.H2 style={{ margin: '0 auto 35px' }}>{title}</Headings.H2>
            <Paragraph style={{ margin: '40px 0px' }}>{text}</Paragraph>
          </>
        )}
              <Lottie
          options={{
            animationData: lottie,
          }}
        />
      </HalfScreen>
    </FlexHolder>
  )
}

const FlexHolder = styled.div`
  display: flex;
  max-width: 1150px;
  align-items: center;
`

const HalfScreen = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

export default TitleWithLottie
