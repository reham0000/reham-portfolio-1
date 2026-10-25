import { createContext, useContext } from "react";

// Shared easing curves
export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.76, 0, 0.24, 1];

// True once the preloader has finished
export const LoadedContext = createContext(false);
export const useLoaded = () => useContext(LoadedContext);

export const pad = (n) => String(n).padStart(2, "0");
