import React from 'react';
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const Grid = ({columns = '1fr 1fr', children}) => {
  const GridHolder = styled.div`
    display: grid;
    grid-template-columns: ${columns};

    ${mediaqueries.desktop`
    grid-template-columns: "1fr";
  `}
  `;

  return <GridHolder>{children}</GridHolder>;
};

export default Grid;
