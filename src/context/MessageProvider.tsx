import { useState } from "react";
import { MessageContext } from "./MessageContext";

interface Props {
    children: React.ReactNode;
};

interface Message {
    text: string;
    user: string;
    profileImage: string
    id: string
  }

export const MessageProvider = ({ children } : Props) => {
    
    const [messages, setMessages] = useState([] as Message[]);

    const clearMessages = () => {
        setMessages([]);
    }

    const addMessage = (message: Message) => {
        setMessages(messages => [...messages, message]);
    }

    return (
        <MessageContext.Provider
            value={{
                messages,
                clearMessages,
                addMessage
           }}
        >
            {children}
        </MessageContext.Provider>
    )
}