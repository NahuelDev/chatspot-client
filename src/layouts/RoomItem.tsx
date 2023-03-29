import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material"

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Room } from "../interfaces";
import { useContext } from "react";
import { SongContext } from "../context/SongContext";
import { UserContext } from "../context/UserContext";

interface Props {
    room: Room
}

export const RoomItem = ({room}: Props) => {
    const { changeSong } = useContext(SongContext);
    const { isPremium } = useContext(UserContext);


  return (
    <ListItem
        secondaryAction={
            <IconButton disabled={!isPremium()} onClick={() => changeSong(room)} edge="end" aria-label={room.isPlaying ? 'pause' : 'play'}>
                {room.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
      }
    >
        <ListItemAvatar>
            <Avatar variant="square" alt={room.album} src={room.image} />
        </ListItemAvatar>
        <ListItemText
            primary={room.name}
            secondary={room.band}
        />
    </ListItem>
  )
}
