import '../styles/globals.css';
import { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import en from '../locales/en.json';
import pt from '../locales/pt.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';

const LOCALES = { en, pt, fr, es };

export default function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState('en');
  const t = LOCALES[lang];

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>OneClickKits</h1>
        <LanguageSelector lang={lang} setLang={setLang} />
      </header>
      <Component {...pageProps} t={t} />
    </div>
  );
}
