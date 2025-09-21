import stripe from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    // Create a Checkout Session for a subscription and require payment method
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_collection: 'always',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      customer_email: email,
      subscription_data: {
        trial_period_days: 14
      },
      success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error', err);
    return res.status(500).json({ error: 'Stripe error' });
  }
}
