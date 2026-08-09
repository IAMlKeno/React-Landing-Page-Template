import '@testing-library/jest-dom';

// jsdom does not implement scrollIntoView, used by the case studies list
// (pagination) and ScrollToSelectedStudy/ScrollToHash.
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || function () {};

// jsdom does not implement window.matchMedia, used by the Navigation
// component's mobile/desktop breakpoint check.
window.matchMedia = window.matchMedia || function (query: string) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  } as unknown as MediaQueryList;
};
