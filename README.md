OneClickKits - Minimal Next.js + Stripe Checkout example (multilingual)

Steps to run locally:
1. Copy .env.example to .env.local and fill your Stripe keys and STRIPE_PRICE_ID.
2. npm install
3. npm run dev
4. Use `stripe listen --forward-to localhost:3000/api/webhook` to test webhooks locally.

Important: replace the in-memory USERS map in pages/api/webhook.js with a real database for production.
