import { useLanguage, LANGUAGE_OPTIONS } from "../../../i18n/LanguageContext";
import { Globe } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
    const { language, setLanguage } = useLanguage();

    const currentOption = LANGUAGE_OPTIONS.find((o) => o.code === language);

    return (
        <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
            <SelectTrigger
                className={`bg-slate-800/50 border-emerald-500/30 backdrop-blur-sm ${compact ? "w-[90px] h-9 text-xs" : "w-[130px]"
                    }`}
            >
                <div className="flex items-center gap-1.5">
                    <Globe className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-emerald-400 shrink-0`} />
                    <SelectValue>
                        {compact ? currentOption?.nativeLabel : currentOption?.nativeLabel}
                    </SelectValue>
                </div>
            </SelectTrigger>
            <SelectContent>
                {LANGUAGE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.code} value={opt.code}>
                        <span className="flex items-center gap-2">
                            <span>{opt.nativeLabel}</span>
                            {opt.code !== "en" && (
                                <span className="text-xs text-slate-500">({opt.label})</span>
                            )}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
