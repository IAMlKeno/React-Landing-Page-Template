import { render } from '@testing-library/react';
import { ScrollToSelectedStudy } from './ScrollToSelectedStudy';

describe('ScrollToSelectedStudy', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="cs-detail-section"></div>';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('scrolls the detail section into view after a delay when a slug is set', () => {
    const scrollIntoView = vi.fn();
    document.getElementById('cs-detail-section')!.scrollIntoView = scrollIntoView;

    render(<ScrollToSelectedStudy slug="some-slug" />);
    expect(scrollIntoView).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('does not scroll when no slug is set', () => {
    const scrollIntoView = vi.fn();
    document.getElementById('cs-detail-section')!.scrollIntoView = scrollIntoView;

    render(<ScrollToSelectedStudy />);
    vi.advanceTimersByTime(200);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
