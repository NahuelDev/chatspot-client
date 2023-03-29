import { createContext } from "react";
import { Room, SongStatus } from "../interfaces";

interface ContextProps {
    song: SongStatus,
    changeSong: (room: Room) => void,
    pauseOrResumeSong: () => void,
    skipNextSong: () => void,
    skipPreviousSong: () => void

}

export const SongContext = createContext({} as ContextProps);