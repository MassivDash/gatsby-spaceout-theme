/* eslint-disable unicorn/prevent-abbreviations */
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/*
 * action types
 */

const SET_NAVIGATOR_POSITION = 'SET_NAVIGATOR_POSITION';
const SET_NAVIGATOR_SCROLL = 'SET_NAVIGATOR_SCROLL';
const SET_NAVIGATOR_SHAPE = 'SET_NAVIGATOR_SHAPE';
const SET_NAVIGATOR_FILTER = 'SET_NAVIGATOR_FILTER';
const SET_IS_WIDE_SCREEN = 'SET_IS_WIDE_SCREEN';
const SET_SCROLL_TO_TOP = 'SET_SCROLL_TO_TOP';
const SET_FONT_SIZE_INCREASE = 'SET_FONT_SIZE_INCREASE';
const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';

/*
 * action creators
 */

export function setNavigatorPosition(value) {
  return { type: SET_NAVIGATOR_POSITION, val: value };
}

export function setNavigatorScroll(value) {
  return { type: SET_NAVIGATOR_SCROLL, val: value };
}

export function setNavigatorShape(value) {
  return { type: SET_NAVIGATOR_SHAPE, val: value };
}

export function setNavigatorFilter(value) {
  return { type: SET_NAVIGATOR_FILTER, val: value };
}

export function setIsWideScreen(value) {
  return { type: SET_IS_WIDE_SCREEN, val: value };
}

export function setScrollToTop(value) {
  return { type: SET_SCROLL_TO_TOP, val: value };
}

export function setFontSizeIncrease(value) {
  return { type: SET_FONT_SIZE_INCREASE, val: value };
}

export function setCategoryFilter(value) {
  return { type: SET_CATEGORY_FILTER, val: value };
}

/*
 * reducer
 */
const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAVIGATOR_POSITION:
      return {
        ...state,
        navigatorPosition: action.val,
      };
    case SET_NAVIGATOR_SCROLL:
      return {
        ...state,
        navigatorScroll: action.val,
      };

    case SET_NAVIGATOR_SHAPE:
      return {
        ...state,
        navigatorShape: action.val,
      };

    case SET_NAVIGATOR_FILTER:
      return {
        ...state,
        navigatorFilter: action.val,
      };

    case SET_IS_WIDE_SCREEN:
      return {
        ...state,
        isWideScreen: action.val,
      };

    case SET_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTop: action.val,
      };

    case SET_FONT_SIZE_INCREASE:
      return {
        ...state,
        fontSizeIncrease: action.val,
      };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.val,
      };

    default:
      return state;
  }
};

const initialState = {
  navigatorPosition: 'is-aside',
  navigatorScroll: false,
  navigatorShape: 'open',
  navigatorFilter: '',
  isWideScreen: false,
  scrollToTop: false,
  fontSizeIncrease: 1,
  categoryFilter: 'all posts',
};

export default preloadedState =>
  reduxCreateStore(
    reducer,
    initialState,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  );
