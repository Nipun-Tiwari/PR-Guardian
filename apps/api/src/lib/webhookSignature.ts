import { createHmac, timingSafeEqual } from 'crypto';

export class WebhookSignatureError extends Error {
  readonly code = 'SIGNATURE_INVALID' as const;
  constructor(detail: string) {
    super(detail);
    this.name = 'WebhookSignatureError';
  }
}

export function verifyGitHubSignature(
  rawBody: Buffer,
  secret: string,
  signatureHeader: string | undefined,
): void {
  if (!signatureHeader) {
    throw new WebhookSignatureError('Missing X-Hub-Signature-256 header');
  }

  const expected = 'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex');
  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signatureHeader);

  // Pad to same length before constant-time compare to avoid length-based timing leak
  const maxLen = Math.max(expectedBuf.length, actualBuf.length);
  const paddedExpected = Buffer.alloc(maxLen);
  const paddedActual = Buffer.alloc(maxLen);
  expectedBuf.copy(paddedExpected);
  actualBuf.copy(paddedActual);

  if (!timingSafeEqual(paddedExpected, paddedActual)) {
    throw new WebhookSignatureError('Invalid webhook signature');
  }
}
