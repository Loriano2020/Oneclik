export default function LanguageSelector({ lang, setLang }) {
  return (
    <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Select language">
      <option value="en">English</option>
      <option value="pt">Português</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
    </select>
  );
}
