import { buffer } from 'micro';
import stripe from '../../lib/stripe';

export const config = {
  api: {
    bodyParser: false
  }
};

// Minimal 'database' example: in-memory (replace with real DB)
const USERS = new Map();

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const subscriptionId = session.subscription;

    // create user record (demo: store in memory) — replace with DB save
    USERS.set(email, {
      email,
      subscriptionId,
      status: 'active',
      trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    });
    console.log('Created user', email);
  }

  res.json({ received: true });
}
