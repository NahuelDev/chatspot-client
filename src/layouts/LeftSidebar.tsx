import { Grid } from "@mui/material"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { SongContext } from "../context/SongContext";
import { Room } from "../interfaces";
import { CurrentSong } from "./CurrentSong"
import { RoomList } from "./RoomList"


export const LeftSidebar = () => {

  const [rooms, setRooms] = useState<Room[]>([]);
 
  const { song } = useContext(SongContext);
  const { socket, isSocketConnected } = useContext(SocketContext);

  const ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
  
  useEffect(() => {
    if( song.id ){
      axios.get(`${ENDPOINT}/api/rooms`)
      .then(res => {

        const newRooms = res.data.map((room: any)=> {
          
          room.isPlaying = room.id === song.id
          return room
        });

        setRooms(newRooms);
      });
    }
  }, [song]); 
  

  useEffect(() => {
    if(isSocketConnected && song.id){
      socket.on("newRoom", (rooms: Room[]) => {
          
        const newRooms = rooms.map((room: Room)=> {
            room.isPlaying = room.id === song.id
            return room
        });

          setRooms(newRooms);
          
      });
    }
    
  }, [isSocketConnected, song]);  
  
  return (
    <Grid container style={{height: 'calc(100vh - 60px)' }} direction="column" justifyContent="space-between" >
      <Grid item style={{maxWidth: '100%'}}>
        {rooms && <RoomList rooms={rooms}/>}
      </Grid> 
      <Grid item style={{maxWidth: '100%'}}>
        <CurrentSong />
      </Grid>
    </Grid>
  )
}
