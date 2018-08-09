import Languages from 'react-native-languages'
import I18n from 'react-native-i18n';
import de from './de.json';
import en from './en.json';
import pl from './pl.json';

I18n.locale = Languages.language
I18n.fallbacks = true;
I18n.translations = {
  de,
  en,
  pl
};

Languages.addEventListener('change', ({ language }) => {
    I18n.locale = language;
});

export default I18n;
