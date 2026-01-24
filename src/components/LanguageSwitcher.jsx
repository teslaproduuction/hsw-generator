import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../i18n/LanguageContext';
import { LANGUAGES, LANGUAGE_NAMES } from '../i18n/translations';

const SwitcherButton = styled.button`
  background: none;
  border: none;
  color: var(--color);
  cursor: pointer;
  font-size: 0.9em;
  padding: 0.2em 0.5em;
  margin-left: 1em;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === LANGUAGES.EN ? LANGUAGES.RU : LANGUAGES.EN);
  };

  const currentLangName = LANGUAGE_NAMES[language];

  return (
    <SwitcherButton onClick={toggleLanguage}>
      {currentLangName}
    </SwitcherButton>
  );
};
