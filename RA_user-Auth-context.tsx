import { createContext } from "react";

export const usernameContext = createContext("");
export const passwordContext = createContext("");
export const isLoggedIn = createContext(false);
export const isAdmin = createContext(false);
export const isTrainee = createContext(false); 