import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations, LANGUAGES } from './translations';

const LanguageContext = createContext();

const getStoredLanguage = () => {
  const stored = localStorage.getItem('language');
  return stored && translations[stored] ? stored : LANGUAGES.EN;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getStoredLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
};
