import { describe, it, expect } from 'vitest';
import { verifyGitHubSignature, WebhookSignatureError } from '../../src/lib/webhookSignature.js';
import { createHmac } from 'crypto';

const SECRET = 'test_secret_for_signature_verification';

function sign(body: Buffer, secret: string): string {
  return 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');
}

// UT-C07 — Webhook integrity
describe('verifyGitHubSignature', () => {
  it('accepts a valid HMAC-SHA256 signature', () => {
    const body = Buffer.from('{"action":"opened"}');
    const sig = sign(body, SECRET);
    expect(() => verifyGitHubSignature(body, SECRET, sig)).not.toThrow();
  });

  it('throws WebhookSignatureError when X-Hub-Signature-256 header is missing', () => {
    const body = Buffer.from('{"action":"opened"}');
    expect(() => verifyGitHubSignature(body, SECRET, undefined)).toThrow(WebhookSignatureError);
    expect(() => verifyGitHubSignature(body, SECRET, undefined)).toThrow(
      'Missing X-Hub-Signature-256 header',
    );
  });

  it('throws WebhookSignatureError when body is tampered', () => {
    const original = Buffer.from('{"action":"opened"}');
    const tampered = Buffer.from('{"action":"closed"}');
    const sig = sign(original, SECRET);
    expect(() => verifyGitHubSignature(tampered, SECRET, sig)).toThrow(WebhookSignatureError);
    expect(() => verifyGitHubSignature(tampered, SECRET, sig)).toThrow('Invalid webhook signature');
  });

  it('throws WebhookSignatureError when the wrong secret is used', () => {
    const body = Buffer.from('{"action":"opened"}');
    const sigWithWrongSecret = sign(body, 'wrong_secret');
    expect(() => verifyGitHubSignature(body, SECRET, sigWithWrongSecret)).toThrow(
      WebhookSignatureError,
    );
  });

  it('throws WebhookSignatureError for a signature with different length (no early timing exit)', () => {
    const body = Buffer.from('{"action":"opened"}');
    // Provide a shorter signature string to ensure padding logic is exercised
    expect(() => verifyGitHubSignature(body, SECRET, 'sha256=tooshort')).toThrow(
      WebhookSignatureError,
    );
  });
});
