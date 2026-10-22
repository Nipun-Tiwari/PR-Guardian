import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DEMO_FINDINGS } from '@prguardian/shared';
import type { FindingV1 } from '@prguardian/shared';
import { FindingCard } from '../src/components/FindingCard.js';

const baseFinding = DEMO_FINDINGS[0]!;

describe('FindingCard', () => {
  // UT-A04: Prevent unsafe rendering — HTML/script in message must be escaped
  it('renders HTML in message as escaped text, not DOM elements (UT-A04)', () => {
    const maliciousFinding: FindingV1 = {
      ...baseFinding,
      message: '<script>alert("xss")</script>',
    };

    render(<FindingCard finding={maliciousFinding} />);

    // script tag must NOT be injected into the DOM
    expect(document.querySelector('script')).toBeNull();

    // The literal text must appear as escaped text content
    expect(screen.getByText('<script>alert("xss")</script>')).toBeInTheDocument();
  });

  it('renders severity badge', () => {
    render(<FindingCard finding={baseFinding} />);
    const badges = screen.getAllByTestId('severity-badge');
    expect(badges.length).toBeGreaterThan(0);
    expect(badges[0]!.textContent).toBe(baseFinding.severity);
  });

  it('renders file path and line number', () => {
    render(<FindingCard finding={baseFinding} />);
    const pathEls = screen.getAllByText(`${baseFinding.filePath}:${baseFinding.lineStart}`);
    expect(pathEls.length).toBeGreaterThan(0);
  });

  it('renders message as plain text', () => {
    render(<FindingCard finding={baseFinding} />);
    const msgEls = screen.getAllByText(baseFinding.message);
    expect(msgEls.length).toBeGreaterThan(0);
  });

  it('does not render evidence/recommendation when not expanded', () => {
    const findingWithEvidence: FindingV1 = {
      ...baseFinding,
      evidence: 'some evidence code',
      recommendation: 'fix it like this',
    };
    render(<FindingCard finding={findingWithEvidence} expanded={false} />);
    expect(screen.queryByText('some evidence code')).toBeNull();
    expect(screen.queryByText('fix it like this')).toBeNull();
  });

  it('renders evidence and recommendation when expanded', () => {
    const findingWithEvidence: FindingV1 = {
      ...baseFinding,
      evidence: 'some evidence code',
      recommendation: 'fix it like this',
    };
    render(<FindingCard finding={findingWithEvidence} expanded={true} />);
    expect(screen.getByText('some evidence code')).toBeInTheDocument();
    expect(screen.getByText('fix it like this')).toBeInTheDocument();
  });
});
