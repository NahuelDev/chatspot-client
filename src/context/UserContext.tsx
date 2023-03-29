import { createContext } from "react";
import { User, UserData } from "../interfaces";

interface ContextProps {
    user: User;
    isUserLoaded: boolean;
    getPublicUserData: () => UserData;
    setAccessAndRefreshToken: (code: string) => void;
    isPremium: () => boolean
}

export const UserContext = createContext({} as ContextProps);