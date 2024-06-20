import prism from './prism';
import { PrismTheme } from './prism';

export interface ThemeColors {
  prism: PrismTheme;
  primary: string;
  secondary: string;
  grey: string;
  spaceout: string;
  background: string;
  accent: string;
  hover: string;
  gradient: string;
  articleText: string;
  track: string;
  progress: string;
  card: string;
  error: string;
  success: string;
  errorBackground: string;
  horizontalRule: string;
  inputBackground: string;
  articleHoverText: string;
  modes: {
    dark: {
      grey: string;
      primary: string;
      secondary: string;
      accent: string;
      spaceout: string;
      background: string;
      hover: string;
      gradient: string;
      articleText: string;
      track: string;
      progress: string;
      card: string;
      error: string;
      success: string;
      errorBackground: string;
      horizontalRule: string;
      inputBackground: string;
      articleHoverText: string;
    };
  };
}

const colors: ThemeColors = {
  prism,
  primary: '#000',
  secondary: '#eeeeee',
  grey: '#373737',
  background: '#fafafa',
  spaceout: '#313131',
  accent: '#27262d',
  hover: 'rgba(0, 0, 0, 0.07)',
  gradient: 'linear-gradient(180deg, rgba(217, 219, 224, 0) 0%, #D9DBE0 100%)',
  articleText: '#333333',
  track: 'rgba(8, 8, 11, 0.3)',
  progress: '#000',
  card: '#fff',
  error: '#EE565B',
  success: '#46B17B',
  errorBackground: 'rgba(238, 86, 91, 0.1)',
  horizontalRule: 'rgba(8, 8, 11, 0.15)',
  inputBackground: 'rgba(0, 0, 0, 0.05)',
  articleHoverText: '#D9DBE0',
  modes: {
    dark: {
      grey: '#fafafa',
      primary: '#fff',
      secondary: '#fff',
      spaceout: '#cfcfd0',
      accent: '#E9DAAC',
      background: '#111216',
      hover: 'rgba(255, 255, 255, 0.07)',
      gradient:
        'linear-gradient(180deg, #111216 0%, rgba(66, 81, 98, 0.36) 100%)',
      articleText: '#fff',
      track: 'rgba(255, 255, 255, 0.3)',
      progress: '#fff',
      card: '#1D2128',
      error: '#EE565B',
      success: '#46B17B',
      errorBackground: 'rgba(238, 86, 91, 0.1)',
      horizontalRule: 'rgba(255, 255, 255, 0.15)',
      inputBackground: 'rgba(255, 255, 255, 0.07)',
      articleHoverText: '#E9DAAC',
    },
  },
};

export default colors;
