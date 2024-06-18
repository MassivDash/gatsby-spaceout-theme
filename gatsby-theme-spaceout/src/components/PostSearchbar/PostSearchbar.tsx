import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Link from 'gatsby-plugin-transition-link';
import { MdSearchOff, MdSearch } from 'react-icons/md';
import { TbZoomReset } from 'react-icons/tb';
import { MdManageSearch } from 'react-icons/md';
import { Theme } from 'src/gatsby-plugin-theme-ui';

type Anchor = {
  element: string;
  id: string;
  text: string;
  location: number;
};

type WeightedLocation = {
  weight: number;
  balanced_score: number;
  location: number;
};

type SubResult = {
  title: string;
  url: string;
  anchor?: Anchor;
  weighted_locations: WeightedLocation[];
  locations: number[];
  excerpt: string;
};

type Meta = {
  image_alt: string;
  image: string;
  title: string;
};

type SearchResult = {
  url: string;
  content: string;
  word_count: number;
  filters: Record<string, unknown>;
  meta: Meta;
  anchors: Anchor[];
  weighted_locations: WeightedLocation[];
  locations: number[];
  raw_content: string;
  raw_url: string;
  excerpt: string;
  sub_results: SubResult[];
};

interface SearchResultInnerCall {
  data: () => Promise<SearchResult>;
}

type WindowWithPagefind = Window & {
  pagefind: {
    search: (term: string) => Promise<{ results: SearchResultInnerCall[] }>;
  };
};

type SearchResults = SearchResult[];

const PostSearchbar: React.FC = () => {
  const [results, setResults] = useState<SearchResults | []>([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [searchItemVisible, setSearchItemVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // This is constructed in the postbuild action script, so we need to ignore the webpack warning and ts warning
    // This requires that the pagefind.js file is in the static folder, run postbuild to generate it
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import(/* webpackIgnore: true */ '/pagefind/pagefind.js')
      .then((module) => {
        (window as unknown as WindowWithPagefind).pagefind = module;
        setScriptLoaded(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const handleSearch = async (e) => {
    try {
      setSearchTerm(e.target.value);

      // grab the first 5 results
      const searchResults = await (
        window as unknown as WindowWithPagefind
      ).pagefind.search(e.target.value);
      const fiveResults = await Promise.all(
        searchResults.results.slice(0, 5).map((r) => r.data()),
      );
      setResults(fiveResults);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={() => setSearchItemVisible(!searchItemVisible)}>
        <StyledSearch searchItemVisible={searchItemVisible} />
        <StyledSearchClose searchItemVisible={searchItemVisible} />
      </Button>

      <Searchbox
        searchItemVisible={searchItemVisible}
        rowCount={results.length}
        searchTerm={searchTerm}
      >
        <FlexHolder>
          <Input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search ..."
            autoComplete="off"
            autoCorrect="off"
          />
          {searchTerm !== '' && (
            <Button
              onClick={() => {
                setResults([]);
                setSearchTerm('');
              }}
            >
              <StyledSearchReset />
            </Button>
          )}
        </FlexHolder>
        {!scriptLoaded && <p>Loading search index...</p>}
        {results.length > 0 ? (
          <Datalist rowCount={results.length}>
            {results.map((result, index) => (
              <DatalistLi key={index}>
                <ResultCard>
                  <div
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  ></div>
                </ResultCard>
                <PostLink
                  to={result.url}
                  onClick={() => setSearchItemVisible(!searchItemVisible)}
                >
                  <sup>
                    <MdManageSearch />
                  </sup>

                  {result.meta.title}
                </PostLink>
              </DatalistLi>
            ))}
          </Datalist>
        ) : results.length === 0 && searchTerm !== '' ? (
          <Datalist rowCount={2}>
            <DatalistLi>
              <ResultCard>
                <div>No results found for "{searchTerm}"</div>
              </ResultCard>
            </DatalistLi>
          </Datalist>
        ) : null}
      </Searchbox>
    </>
  );
};

const Searchbox = styled.div<{
  theme: Theme;
  searchItemVisible: boolean;
  rowCount: number;
  searchTerm: string;
}>`
  position: fixed;
  color: ${(p: any) => p.theme.colors.primary};
  background: ${(p: any) => p.theme.colors.background};
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 310px;
  z-index: ${(p) => (p.searchItemVisible ? 999 : -1)};
  transform: ${(p) =>
    p.searchItemVisible ? 'translateX(0)' : 'translateX(150%)'};
  right: calc(2vw + 35px);
  top: 10px;
  flex-direction: column;
  margin-left: 320px;
  height: ${(p) =>
    p.rowCount > 0 ? p.rowCount * 400 : p.searchTerm !== '' ? 400 : 55}px;
  max-height: 95%;
  overflow-y: scroll;
  transition: all 0.9s var(--ease-in-out-quad),
    background-color 0.25s var(--ease-in-out-quad),
    color 0.25s var(--ease-in-out-quad);
`;

const Input = styled.input`
  background: ${(p: any) => p.theme.colors.background};
  color: ${(p: any) => p.theme.colors.primary};
  display: block;
  font-size: 1.6rem;
  border: none;
  padding: 1.5rem 1.75rem;
  transition: 0.9s var(--ease-in-out-quad),
    background-color 0.25s var(--ease-in-out-quad),
    color 0.25s var(--ease-in-out-quad);
`;

const Datalist = styled.ul<{ rowCount: number }>`
  width: 100%;
  padding: 1.5rem 1.75rem;
  background: ${(p: any) => p.theme.colors.background};
  color: ${(p: any) => p.theme.colors.primary};
  height: ${(p) => (p.rowCount > 0 ? 100 : 0)}%;
`;

const DatalistLi = styled.li`
  cursor: pointer;
  list-style: none;
  display: flex-column;
  margin: 1.5rem 0;
  border-bottom: 1px solid ${(p: any) => p.theme.colors.primary};
`;

const ResultCard = styled.div`
  background: ${(p: any) => p.theme.colors.background};
  color: ${(p: any) => p.theme.colors.primary};
  padding: 1.5rem 1.75rem;
  list-style: none;
`;

const Button = styled.button<{ theme: any }>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  margin: auto;
  border-radius: 50%;
  background: transparent;
  z-index: 999999999999;
  min-width: 28px;
  min-height: 28px;
  position: relative;
  opacity: 0.5;

  color: ${(p) => p.theme.colors.primary};

  &:hover {
    opacity: 1;
    background: ${(p) => p.theme.colors.hover};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${(p) => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`;

const PostLink = styled(Link)`
  padding: 1.5rem 1.75rem;
  margin: 1.5rem 0;
  width: 100%;
  display: block;
  align-items: center;
  font-style: italic;
  color: ${(p: any) => p.theme.colors.accent};
  cursor: pointer;
  text-decoration: none;
  transition: 0.9s var(--ease-in-out-quad),
    background-color 0.25s var(--ease-in-out-quad),
    color 0.25s var(--ease-in-out-quad);

  &:hover {
    background: ${(p: any) => p.theme.colors.hover};
  }
`;

const StyledSearch = styled(MdSearch)<{
  searchItemVisible: boolean;
  theme: any;
}>`
  width: 28px;
  height: 28px;
  position: absolute;
  opacity: ${(p) => (p.searchItemVisible ? 0 : 1)};
  transition: 0.9s var(--ease-in-out-quad);
`;

const StyledSearchClose = styled(MdSearchOff)<{
  searchItemVisible: boolean;
  theme: any;
}>`
  width: 28px;
  height: 28px;
  position: absolute;
  opacity: ${(p) => (p.searchItemVisible ? 1 : 0)};
  transition: 0.9s var(--ease-in-out-quad);
`;

const StyledSearchReset = styled(TbZoomReset)`
  width: 28px;
  height: 28px;
  transition: 0.9s var(--ease-in-out-quad);
`;

const FlexHolder = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
`;

export default PostSearchbar;
