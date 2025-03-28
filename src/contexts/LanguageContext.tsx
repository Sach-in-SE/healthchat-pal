
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import englishMessages from '@/locales/en.json';
import spanishMessages from '@/locales/es.json';
import hindiMessages from '@/locales/hi.json';

// Define supported languages and their configurations
export const languages = {
  en: {
    name: 'English',
    messages: englishMessages,
    dir: 'ltr',
    locale: 'en',
    flag: '🇺🇸'
  },
  es: {
    name: 'Español',
    messages: spanishMessages,
    dir: 'ltr',
    locale: 'es',
    flag: '🇪🇸'
  },
  hi: {
    name: 'हिंदी',
    messages: hindiMessages,
    dir: 'ltr',
    locale: 'hi',
    flag: '🇮🇳'
  }
};

export type LanguageCode = keyof typeof languages;

interface LanguageContextType {
  currentLanguage: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with browser language or default to English
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageCode;
    const browserLanguage = navigator.language.split('-')[0] as LanguageCode;
    
    // Check if browser language is supported
    if (savedLanguage && languages[savedLanguage]) {
      return savedLanguage;
    } else if (browserLanguage && languages[browserLanguage]) {
      return browserLanguage;
    }
    
    return 'en'; // Default to English
  });

  // Apply RTL styling if needed
  useEffect(() => {
    document.documentElement.dir = languages[currentLanguage].dir;
    document.documentElement.lang = currentLanguage;
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    languages
  };

  return (
    <LanguageContext.Provider value={value}>
      <IntlProvider
        locale={currentLanguage}
        messages={languages[currentLanguage].messages}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
