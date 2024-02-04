import i18n from "i18n-js";

import fr from "./Locales/fr.json";

i18n.defaultLocale = "fr";
i18n.fallbacks = true;
i18n.translations = { fr };

export default i18n;