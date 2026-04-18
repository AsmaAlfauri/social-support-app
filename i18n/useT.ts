import { useWizard } from "@/store/wizard.context";
import { translations } from "./translations";

export function useT() {
  const { language } = useWizard();

  return (key: string) => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value ?? key;
  };
}