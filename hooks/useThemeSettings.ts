import { useEffect, useState } from "react";
import { API } from "@/lib/api";

export interface ThemeSettings {
  address: string;
  email: string;
  logo: string;
  phone_number: string;
}

export function useThemeSettings() {
  const [settings, setSettings] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(API.theme_settings);
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}