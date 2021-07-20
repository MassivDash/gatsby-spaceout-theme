import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface Props {
  letter: string;
}

const families = [
  'Open Sans',
  'Roboto',
  'Playfair Display',
  'Paytone One',
  'Raleway',
  'Oswad',
  'Cormorant',
  'Barlow Condensed',
  'Cutive',
  'Open Sans',
  'Roboto',
  'Playfair Display',
  'Paytone One',
  'Raleway',
  'Oswad',
  'Cormorant',
  'Barlow Condensed',
  'Cutive',
];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ShuffleFontSpan: FC<Props> = ({ letter }) => {
  const [fontFamily, setFontFamily] = useState<string>('Open Sans');
  useEffect(() => {
    const interval = setInterval(() => {
      setFontFamily(families[randomInteger(0, families.length - 1)]);
    }, randomInteger(2, 6) * 1000);
    return () => clearInterval(interval);
  }, []);

  return <Span fontFamily={fontFamily}>{letter}</Span>;
};

const Span = styled.span<{ fontFamily: string }>`
  font-family: ${(p: any) => p.fontFamily};
  font-size: 120%;
`;

export default ShuffleFontSpan;
