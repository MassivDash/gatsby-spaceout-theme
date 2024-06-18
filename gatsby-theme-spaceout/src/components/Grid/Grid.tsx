import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const Grid: React.FC<{ columns?: string; children: ReactNode | ReactNode[] }> =
  ({ columns = '1fr 1fr', children }) => {
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
