/* eslint-disable */

module.exports = ({ routerProps, prevRouterProps, getSavedScrollPosition }) => {

  const topOfPage = [0, 0]

  // Handling previous path into local storage for "Back" arrow button
  if (prevRouterProps) {
    window.localStorage.setItem(
      'previousPath',
      prevRouterProps.location.pathname
    )
  }

  return false
}
