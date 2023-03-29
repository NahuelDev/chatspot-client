export interface User {
    displayName: string;
    email: string;
    country: string;
    id: string;
    profileImage: {
        url: string,
        height: number,
        width: number
    },
    isPremium: boolean
}

export interface SongStatus{
    id: string,
    isPlaying: boolean,
    name: string,
    album: string,
    band: string,
    image: string,
}

export interface UserData {
    id: string;
    username: string;
    country: string;
}

export interface Room extends Omit<SongStatus, "isPlaying"> {
    isPlaying?: boolean;
}

export interface joinRoomProps {
    userData: UserData;
    room: Room;
}

export interface ServerToClientEvents {
    message: ([x]: any) => void;
    setRoom: ([x]: any) => void;
    newRoom: ([x]: any) => void;
}

export interface ClientToServerEvents {
    join: ([x]: any) => void;
    sendMessage: ([x]: any) => void;
}