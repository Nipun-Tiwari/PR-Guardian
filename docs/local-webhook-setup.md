# Local Webhook Development with ngrok

## Why this is needed

GitHub webhooks require a publicly reachable HTTPS URL. In local development, use ngrok to expose your local API server temporarily.

## One-time setup

1. Install ngrok: https://ngrok.com/download
2. Create a free account and get your auth token
3. Authenticate: `ngrok config add-authtoken <your-token>`

## Starting a tunnel session

Assuming the API runs on port 3001:

```bash
ngrok http 3001
```

Copy the `https://<id>.ngrok-free.app` URL from the output.

**Tip:** Free ngrok accounts support one static domain (Endpoints > New static domain). Use it to avoid updating the GitHub App webhook URL every session.

## Configuring the webhook URL

1. Open your GitHub App settings → **Webhook URL**
2. Set it to: `https://<your-ngrok-host>/webhooks/github`
3. Update whenever the hostname changes (free tier gets a new hostname each session unless you use a static domain)

## Signature verification requirements

The webhook handler verifies the HMAC-SHA256 signature against the **raw request body bytes** — not re-serialized JSON. This means:

- The webhook route uses a raw-body parser **before** JSON middleware
- The signature header `X-Hub-Signature-256` is compared in constant time
- The JSON payload is parsed only **after** the signature is verified
- Any proxy or tunnel must forward the body without modification

## Verification procedure (run in M3)

1. Start the API: `npm run dev -w apps/api`
2. Start ngrok: `ngrok http 3001`
3. Configure the tunnel URL in your GitHub App settings
4. Use GitHub's **Redeliver** button (App settings → Advanced → Recent Deliveries) to send a real event
5. Confirm the API logs show the webhook was accepted
6. Modify the payload manually and redeliver — confirm the API rejects it with a 401
7. Send the same event twice — confirm only one review job is created (deduplication)
8. Verify the tunnel forwarded the body without modifying it

## Important notes

- ngrok is for **development only** — never expose production secrets through it
- The webhook handler must **never** trust `X-GitHub-Event` or the JSON body before signature validation passes
- Restart ngrok after a long idle period — free-tier tunnels can time out
