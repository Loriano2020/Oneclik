import axios from 'axios';
import { useState } from 'react';

export default function Home({ t }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleStart(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await axios.post('/api/create-checkout-session', { email });
      const { url } = res.data;
      // redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setMsg(t.errorTry);
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 760 }}>
      <h2>{t.heroTitle}</h2>
      <p>{t.heroSubtitle}</p>
      <form onSubmit={handleStart}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          {t.emailLabel}
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }} />
        </label>
        <p style={{ fontSize: 12 }}>
          {t.trialExplain}
        </p>
        <button disabled={loading} type="submit" style={{ marginTop: 12, padding: '10px 16px' }}>
          {loading ? t.loading : t.startButton}
        </button>
      </form>
      {msg && <div style={{ color: 'red', marginTop: 12 }}>{msg}</div>}
    </main>
  );
}
