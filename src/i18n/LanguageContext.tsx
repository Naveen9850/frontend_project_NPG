import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "./en.json";
import te from "./te.json";
import hi from "./hi.json";

export type Language = "en" | "te" | "hi";

const dictionaries: Record<Language, Record<string, any>> = { en, te, hi };

export const LANGUAGE_OPTIONS: { code: Language; label: string; nativeLabel: string }[] = [
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
    { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
];

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => { },
    t: (key: string) => key,
});

/**
 * Resolve a dot-separated key like "detection.pageTitle" from a nested dict.
 */
function resolve(dict: Record<string, any>, key: string): string {
    const parts = key.split(".");
    let current: any = dict;
    for (const part of parts) {
        if (current === undefined || current === null) return key;
        current = current[part];
    }
    return typeof current === "string" ? current : key;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem("app_language");
        if (saved && (saved === "en" || saved === "te" || saved === "hi")) {
            return saved as Language;
        }
        return "en";
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("app_language", lang);
    };

    // Set the html lang attribute for accessibility
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string): string => {
        const result = resolve(dictionaries[language], key);
        // Fallback to English if key not found in selected language
        if (result === key) {
            return resolve(dictionaries.en, key);
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
