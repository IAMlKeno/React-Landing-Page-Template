import '@testing-library/jest-dom';

// jsdom does not implement HTMLDialogElement methods used by CartModal.
// These stubs give realistic open/close behaviour so ARIA queries work correctly.
HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
  this.removeAttribute('open');
};

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
