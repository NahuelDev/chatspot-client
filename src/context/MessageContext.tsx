import { createContext } from "react";

interface Message {
    text: string;
    user: string;
    profileImage: string
    id: string
  }

interface ContextProps {
    messages: Message[];
    clearMessages: () => void;
    addMessage: (message: Message) => void;
}

export const MessageContext = createContext({} as ContextProps);