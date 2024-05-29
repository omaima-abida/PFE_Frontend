// Exemple de code utilisant i18next pour la traduction
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Ajoutez vos traductions en anglais ici
          welcome: 'Welcome',
          // Autres traductions
          discover_world: 'Let\'s discover the world!',
          book_now: 'Book now and enjoy 15% off !! before 01/10/2024',
        }

      },
      fr: {
        translation: {
          // Ajoutez vos traductions en français ici
          welcome: 'Bienvenue',
          // Autres traductions
          discover_world: 'Découvrons le monde!',
          book_now: 'Réservez maintenant et profitez de 15% de réduction !! avant le 01/10/2024',
        }
      },
      ar: {
        translation: {
          discover_world: 'لنكتشف العالم!',
          book_now: 'احجز الآن واستمتع بخصم 15% !! قبل 01/10/2024',
          // Ajoutez d'autres traductions ici
        }
      },
      // Ajoutez des ressources pour d'autres langues si nécessaire
    },
    debug: true,
    lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de secours si la traduction n'est pas disponible
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;
