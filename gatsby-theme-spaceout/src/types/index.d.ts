export interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
}

interface IGatsbyImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface IGatsbyImageFluid extends IGatsbyImage {
  maxHeight: number;
  maxWidth: number;
}

interface IGatsbyImageFixed extends IGatsbyImage {
  height: number;
  width: number;
}

export interface IAuthor {
  authorsPage?: boolean;
  featured?: boolean;
  name: string;
  slug: string;
  bio: string;
  social: {
    name: string;
    url: string;
  }[];
  avatar: {
    image: IGatsbyImageFluid;
    full: IGatsbyImageFluid;
    medium: IGatsbyImageFluid;
    large: IGatsbyImageFluid;
    small: IGatsbyImageFluid;
  };
}

export interface IArticle {
  slug: string;
  authors: IAuthor[];
  excerpt: string;
  body: string;
  id: string;
  title: string;
  category: 'Post' | 'Project';
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    narrow: IGatsbyImageFluid;
    seo: {
      src: string;
    };
  };
  timeToRead: number;
  dateForSEO: string;
  date: string;
  appDescription: string;
  tech: string[];
}

interface IArticleQuery {
  edges: {
    node: IArticle;
  }[];
}

export interface IProgress {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
}

export interface Location {
  pathname: string;
  href: string;
}

export interface PageContext extends IPaginator {
  pageCount: number;
  group: IArticle[];
  additionalContext: {
    authors: IAuthor[];
    author: IAuthor;
  };
}
