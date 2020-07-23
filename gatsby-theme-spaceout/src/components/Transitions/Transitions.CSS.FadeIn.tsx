import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

interface CSSFadeInProps {
  as?: string
  children: React.ReactChildren
}

function CSSFadeIn({ as, children }: CSSFadeInProps) {
  return <Transition as={as}>{children}</Transition>
}

export default CSSFadeIn

const fadein = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0 }
  100% { opacity: 1; }
`

const Transition = styled.div`
  opacity: 0;
  animation: ${fadein} 1.5s linear forwards;
`
