import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

/*
 * action types
 */

const SET_NAVIGATOR_POSITION = 'SET_NAVIGATOR_POSITION'
const SET_NAVIGATOR_SCROLL = 'SET_NAVIGATOR_SCROLL'
const SET_NAVIGATOR_SHAPE = 'SET_NAVIGATOR_SHAPE'
const SET_NAVIGATOR_FILTER = 'SET_NAVIGATOR_FILTER'
const SET_IS_WIDE_SCREEN = 'SET_IS_WIDE_SCREEN'
const SET_SCROLL_TO_TOP = 'SET_SCROLL_TO_TOP'
const SET_FONT_SIZE_INCREASE = 'SET_FONT_SIZE_INCREASE'
const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER'

/*
 * action creators
 */

export function setnavigatorposition(value) {
  return { type: SET_NAVIGATOR_POSITION, value }
}

export function setNavigatorScroll(value) {
  return { type: SET_NAVIGATOR_SCROLL, value }
}

export function setNavigatorShape(value) {
  return { type: SET_NAVIGATOR_SHAPE, value }
}

export function setNavigatorFilter(value) {
  return { type: SET_NAVIGATOR_FILTER, value }
}

export function setIsWideScreen(value) {
  return { type: SET_IS_WIDE_SCREEN, value }
}

export function setScrollToTop(value) {
  return { type: SET_SCROLL_TO_TOP, value }
}

export function setFontSizeIncrease(value) {
  return { type: SET_FONT_SIZE_INCREASE, value }
}

export function setCategoryFilter(value) {
  return { type: SET_CATEGORY_FILTER, value }
}

/*
 * reducer
 */
const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAVIGATOR_POSITION:
      return {
        ...state,
        navigatorposition: action.value,
      }
    case SET_NAVIGATOR_SCROLL:
      return {
        ...state,
        navigatorScroll: action.value,
      }

    case SET_NAVIGATOR_SHAPE:
      return {
        ...state,
        navigatorShape: action.value,
      }

    case SET_NAVIGATOR_FILTER:
      return {
        ...state,
        navigatorFilter: action.value,
      }

    case SET_IS_WIDE_SCREEN:
      return {
        ...state,
        isWideScreen: action.value,
      }

    case SET_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTop: action.value,
      }

    case SET_FONT_SIZE_INCREASE:
      return {
        ...state,
        fontSizeIncrease: action.value,
      }

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.value,
      }

    default:
      return state
  }
}

const initialState = {
  navigatorposition: 'main',
  navigatorScroll: false,
  navigatorShape: 'hidden',
  navigatorFilter: '',
  isWideScreen: false,
  scrollToTop: false,
  fontSizeIncrease: 1,
  categoryFilter: 'all posts',
}

export default preloadedState =>
  reduxCreateStore(
    reducer,
    initialState,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
