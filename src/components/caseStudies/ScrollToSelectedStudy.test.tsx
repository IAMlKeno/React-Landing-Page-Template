import { render } from '@testing-library/react';
import { ScrollToSelectedStudy } from './ScrollToSelectedStudy';

describe('ScrollToSelectedStudy', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="cs-detail-section"></div>';
  });

  it('scrolls the detail section into view shortly after a slug is provided', async () => {
    vi.useFakeTimers();
    const el = document.getElementById('cs-detail-section')!;
    const scrollSpy = vi.spyOn(el, 'scrollIntoView');

    render(<ScrollToSelectedStudy slug="some-slug" />);
    expect(scrollSpy).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(150);
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    vi.useRealTimers();
  });

  it('does not scroll when no slug is provided', async () => {
    vi.useFakeTimers();
    const el = document.getElementById('cs-detail-section')!;
    const scrollSpy = vi.spyOn(el, 'scrollIntoView');

    render(<ScrollToSelectedStudy />);
    await vi.advanceTimersByTimeAsync(150);
    expect(scrollSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
