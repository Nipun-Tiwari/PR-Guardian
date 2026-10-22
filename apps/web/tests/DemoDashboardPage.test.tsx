import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DEMO_REVIEWS, DEMO_FINDINGS } from '@prguardian/shared';
import { ApiError } from '../src/api/client.js';

vi.mock('../src/api/demo.js', () => ({
  getDemoReviews: vi.fn(),
  getDemoReview: vi.fn(),
  getDemoFindings: vi.fn(),
}));

// Must import after mock declaration
const { getDemoReviews } = await import('../src/api/demo.js');
const { DemoDashboardPage } = await import('../src/pages/DemoDashboardPage.js');

const demoReview = DEMO_REVIEWS[0]!;
const findingsForReview = DEMO_FINDINGS.filter((f) => f.reviewId === demoReview.id);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('DemoDashboardPage', () => {
  // UT-A01: Load sample review — renders review summary
  it('renders review title after successful fetch (UT-A01)', async () => {
    vi.mocked(getDemoReviews).mockResolvedValue(DEMO_REVIEWS);

    render(
      <MemoryRouter>
        <DemoDashboardPage />
      </MemoryRouter>,
    );

    const title = await screen.findByText(demoReview.pullRequest.title);
    expect(title).toBeInTheDocument();
  });

  it('renders finding summary counts', async () => {
    vi.mocked(getDemoReviews).mockResolvedValue(DEMO_REVIEWS);

    render(
      <MemoryRouter>
        <DemoDashboardPage />
      </MemoryRouter>,
    );

    await screen.findByText(demoReview.pullRequest.title);
    const summaryEls = screen.getAllByText(`${demoReview.findingsSummary.total} findings:`);
    expect(summaryEls.length).toBeGreaterThan(0);
  });

  // UT-A03: Handle API unavailable (SERVICE_UNAVAILABLE)
  it('renders Demo Unavailable when API returns 503 (UT-A03)', async () => {
    vi.mocked(getDemoReviews).mockRejectedValue(
      new ApiError({
        type: 'https://prguardian.dev/problems/service-unavailable',
        title: 'Demo mode is not available',
        status: 503,
        detail: 'The demo feature is currently disabled. Please try again later.',
        code: 'SERVICE_UNAVAILABLE',
        requestId: 'req_test_001',
        retryable: true,
      }),
    );

    render(
      <MemoryRouter>
        <DemoDashboardPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Demo Unavailable')).toBeInTheDocument();
    expect(await screen.findByText(/This error is temporary/)).toBeInTheDocument();
  });

  it('renders generic error message for network failures', async () => {
    vi.mocked(getDemoReviews).mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter>
        <DemoDashboardPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows sample data label', async () => {
    vi.mocked(getDemoReviews).mockResolvedValue(DEMO_REVIEWS);

    render(
      <MemoryRouter>
        <DemoDashboardPage />
      </MemoryRouter>,
    );

    await screen.findByText(demoReview.pullRequest.title);
    const sampleLabels = screen.getAllByText('Sample data');
    expect(sampleLabels.length).toBeGreaterThan(0);
  });
});

export { findingsForReview };
