"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Outcome } from "./outcomes";

const PHOTO_KEY = "felyhart:photo";
const RESULT_KEY = "felyhart:result";

type AnalysisContextValue = {
  photo: string | null;
  result: Outcome | null;
  hydrated: boolean;
  setPhoto: (photo: string | null) => void;
  setResult: (result: Outcome | null) => void;
  reset: () => void;
};

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

function readSession<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeSession(key: string, value: unknown) {
  try {
    if (value === null) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // best-effort only — ignore quota/availability errors
  }
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [photo, setPhotoState] = useState<string | null>(null);
  const [result, setResultState] = useState<Outcome | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time sync from sessionStorage (an external store unavailable during
    // SSR) into React state on mount — not a derived-state anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhotoState(readSession<string>(PHOTO_KEY));
    setResultState(readSession<Outcome>(RESULT_KEY));
    setHydrated(true);
  }, []);

  const setPhoto = (value: string | null) => {
    setPhotoState(value);
    writeSession(PHOTO_KEY, value);
  };

  const setResult = (value: Outcome | null) => {
    setResultState(value);
    writeSession(RESULT_KEY, value);
  };

  const reset = () => {
    setPhoto(null);
    setResult(null);
  };

  return (
    <AnalysisContext.Provider value={{ photo, result, hydrated, setPhoto, setResult, reset }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used within AnalysisProvider");
  return ctx;
}
