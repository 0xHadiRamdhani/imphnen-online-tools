"use client";

import { useMemo, useSyncExternalStore } from "react";

export const STORAGE_KEYS = {
  favorites: "imphnen-favorites",
  recent: "imphnen-recent",
  theme: "imphnen-theme",
  language: "imphnen-language",
  workspaceName: "imphnen-workspace-name",
} as const;

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("imphnen-local-update", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("imphnen-local-update", onChange);
  };
}

export function useStoredValue(key: string, fallback: string): string {
  return useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem(key) ?? fallback,
    () => fallback,
  );
}

export function useStoredStringList(key: string): string[] {
  const serialized = useStoredValue(key, "[]");

  return useMemo(() => {
    try {
      const value: unknown = JSON.parse(serialized);
      return Array.isArray(value) && value.every((item) => typeof item === "string")
        ? value
        : [];
    } catch {
      return [];
    }
  }, [serialized]);
}

export function writeStoredValue(key: string, value: string): void {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event("imphnen-local-update"));
}

export function writeStringList(key: string, values: string[]): void {
  writeStoredValue(key, JSON.stringify(values));
}
