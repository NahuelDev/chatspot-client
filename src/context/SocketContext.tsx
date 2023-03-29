import { createContext } from "react";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, joinRoomProps, ServerToClientEvents } from "../interfaces";



interface ContextProps {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    isSocketConnected: boolean;
    joinRoom: (data: joinRoomProps) => void;
}

export const SocketContext = createContext({} as ContextProps);