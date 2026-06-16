import '@testing-library/jest-dom';

// jsdom does not implement HTMLDialogElement methods used by CartModal.
// These stubs give realistic open/close behaviour so ARIA queries work correctly.
HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
  this.removeAttribute('open');
};
