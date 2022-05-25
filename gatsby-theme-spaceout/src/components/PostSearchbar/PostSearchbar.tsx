import React from 'react';
import styled from '@emotion/styled';
import Icons from '@icons';

interface Props {
  posts?: string[];
}

const PostSearchbar: React.FC<Props> = ({ posts }) => {
  return (
    <Searchbox>
      <Icons.Search />
      <Input list="posts" placeholder="Search posts" autoComplete="on" />
      <Datalist id="posts">
        {posts?.map((post) => (
          <option key={post} value={post} />
        ))}
      </Datalist>
    </Searchbox>
  );
};

const Searchbox = styled.div`
  position: relative;
  margin: 5.5rem 0;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  color: ${(p: any) => p.theme.colors.primary};
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  max-width: 320px;
  width: 100%;
`;

const Input = styled.input`
  background: ${(p: any) => p.theme.colors.background};
  color: ${(p: any) => p.theme.colors.primary};
  display: block;
  font-size: 1.6rem;
  border: none;
  padding: 1.5rem 1.75rem;
  max-width: 100%;
  transition: 0.9s var(--ease-in-out-quad),
    background-color 0.25s var(--ease-in-out-quad),
    color 0.25s var(--ease-in-out-quad);
`;

const Datalist = styled.datalist`
  width: 100%;
  heigh: 50px;
  background: ${(p: any) => p.theme.colors.background};
`;

export default PostSearchbar;
