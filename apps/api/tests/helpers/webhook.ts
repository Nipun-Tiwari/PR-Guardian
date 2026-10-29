import { createHmac } from 'crypto';

export interface SignedWebhookRequest {
  body: Buffer;
  headers: Record<string, string>;
}

export function buildSignedWebhookRequest(
  event: string,
  payload: Record<string, unknown>,
  secret: string,
  deliveryId: string = `test-delivery-${Date.now()}-${Math.random().toString(36).slice(2)}`,
): SignedWebhookRequest {
  const body = Buffer.from(JSON.stringify(payload), 'utf8');
  const signature = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');

  return {
    body,
    headers: {
      'content-type': 'application/json',
      'x-github-event': event,
      'x-github-delivery': deliveryId,
      'x-hub-signature-256': signature,
    },
  };
}
