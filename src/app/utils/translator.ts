/**
 * Google Cloud Translation utility for dynamic recommendation text.
 * Only used for translating AI-generated recommendation text, NOT UI labels.
 *
 * Uses the free Google Translate web API endpoint.
 * Includes in-memory caching to avoid repeated API calls.
 */

// In-memory translation cache:  "text|targetLang" → translated text
const translationCache = new Map<string, string>();

/**
 * Translate text using Google Cloud Translate (free tier endpoint).
 * Falls back to the original text if the API fails.
 *
 * @param text       The English text to translate
 * @param targetLang Target language code ("te" for Telugu, "hi" for Hindi)
 * @returns          Translated text, or originaltext on failure
 */
export async function translateText(
    text: string,
    targetLang: string
): Promise<string> {
    // Don't translate if target is English or text is empty
    if (targetLang === "en" || !text || text.trim() === "") {
        return text;
    }

    // Check cache first
    const cacheKey = `${text}|${targetLang}`;
    const cached = translationCache.get(cacheKey);
    if (cached) {
        return cached;
    }

    try {
        // Use the free Google Translate API endpoint
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.warn(`Translation API returned ${response.status}, using original text`);
            return text;
        }

        const data = await response.json();

        // The response format is: [[["translated text", "source text", ...], ...], ...]
        // We need to concatenate all translated segments
        let translated = "";
        if (data && data[0]) {
            for (const segment of data[0]) {
                if (segment[0]) {
                    translated += segment[0];
                }
            }
        }

        if (translated) {
            // Cache the result
            translationCache.set(cacheKey, translated);
            return translated;
        }

        return text;
    } catch (error) {
        console.warn("Translation failed, using original text:", error);
        return text;
    }
}

/**
 * Clear the translation cache (useful for testing).
 */
export function clearTranslationCache() {
    translationCache.clear();
}
