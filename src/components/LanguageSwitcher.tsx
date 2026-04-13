import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'flag-icons/css/flag-icons.min.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'pt-BR', countryCode: 'br', name: 'Português (BR)' },
    { code: 'pt-PT', countryCode: 'pt', name: 'Português (PT)' },
    { code: 'en', countryCode: 'gb', name: 'English' },
    { code: 'es', countryCode: 'es', name: 'Español' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-surface/40 transition-colors"
        title="Selecionar idioma"
      >
        <span className={`fi fi-${currentLanguage?.countryCode} text-lg`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -12 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="absolute right-0 mt-3 flex gap-2 bg-background/90 backdrop-blur-md border border-border/40 rounded-lg p-2 shadow-lg z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-md transition-all ${
                  i18n.language === lang.code
                    ? 'bg-primary/20 border border-primary/40 ring-2 ring-primary/40'
                    : 'hover:bg-surface/60'
                }`}
                title={lang.name}
              >
                <span className={`fi fi-${lang.countryCode} text-xl`} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
