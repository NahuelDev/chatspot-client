import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents, joinRoomProps } from "../interfaces";
import { SocketContext } from "./SocketContext";
import { MessageContext } from "./MessageContext";

interface Props {
    children: React.ReactNode;
};

export const SocketProvider = ({ children } : Props) => {
    
    const ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
    
    const [socket, setSocket] = useState({} as Socket<ServerToClientEvents, ClientToServerEvents>);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const { clearMessages } = useContext(MessageContext);

    useEffect(() => {
        const socket = io(ENDPOINT);
        setSocket(socket);
        setIsSocketConnected(true);

        return () => {
            socket.disconnect()
        };
    }, []);

    const joinRoom = ({userData, room}: joinRoomProps) => { 
        clearMessages();
        socket.emit("join", {userData, room});
    }
    
    return (
        <SocketContext.Provider
            value={{
                socket,
                isSocketConnected,
                joinRoom
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}