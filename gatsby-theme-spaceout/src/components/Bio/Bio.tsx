import React, { FC } from 'react';
import Link from 'gatsby-plugin-transition-link';
import styled from '@emotion/styled';

import Image from '@components/Image';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const Bio: FC<{ author: IAuthor }> = ({ author }) => {
  return (
    <BioContainer>
      <BioAvatar
        as={author.authorsPage ? Link : 'div'}
        to={author.slug}
        data-a11y="false"
        aria-label="Author's bio"
      >
        <BioAvatarInner>
          <Image src={author.avatar.medium} />
        </BioAvatarInner>
      </BioAvatar>
      <BioText dangerouslySetInnerHTML={{ __html: author.bio }} />
    </BioContainer>
  );
};

export default Bio;

const BioContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 10px;
  margin-top: 20px;

  ${mediaqueries.phablet`
    display: flex;
    flex-direction: column; 
    margin-bottom: 200px;
  `};
`;

const BioAvatar = styled.div`
  display: block;
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  margin-right: 16px;
  margin: 10px 26px 10px 10px;

  &::after {
    content: '';
    position: absolute;
    left: -5px;
    display: block;
    top: -5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 50px;
    height: 50px;
    border: 2px solid ${(p: any) => p.theme.colors.accent};
  }
`;

const BioAvatarInner = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  margin-right: 16px;
  overflow: hidden;
`;

const BioText = styled.p`
  font-size: 17px;
  line-height: 1.45;
  color: ${(p: any) => p.theme.colors.articleText};
  .black a {
    color: ${(p: any) => p.theme.colors.articleText};
    text-decoration: underline;
  }
`;
