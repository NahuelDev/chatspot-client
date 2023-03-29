import { List, Typography, Box } from "@mui/material"
import { RoomItem } from ".";
import { Room } from "../interfaces";

interface Props { 
    rooms: Room[]
}
export const RoomList = ({rooms}: Props) => {
    
  return (
    <Box style={{maxHeight: 'calc(100vh - 200px)', overflow: 'auto'}}>
        <Typography variant="h6" align="center">Rooms</Typography>
        <List>
            {
                rooms.map(
                    room => (
                        <RoomItem key={room.id} room={room}/>
                    )
                )
            }
        </List>
    </Box>
  )
}
