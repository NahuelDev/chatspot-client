import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { SongContext } from "../context/SongContext";
import { UserContext } from "../context/UserContext";
import { Avatar, Box, Typography, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { MessageContext } from "../context/MessageContext";

interface Message {
  text: string;
  user: string;
  profileImage: string
  id: string
}

const MessageLeft = (props: {message :Message}) => {

  const {user, profileImage, text} = props.message;

  return (
    <Box display="flex" maxWidth={'60%'}>
      <Avatar alt={user} src={profileImage}/>
      <Box bgcolor="primary.main" color="primary.contrastText" px={2} my={1} ml={1} borderRadius={2}>
        <Typography py={0.5} variant='subtitle2'>{user}</Typography>
        <Typography pb={1} variant="body1">{text}</Typography>
      </Box>
    </Box>
  )
}

const MessageRight = (props: {message :Message}) => {

  const {user, text, profileImage} = props.message;

  return (
    <Box display="flex" alignSelf={'flex-end'} maxWidth={'60%'}>
      <Box bgcolor="primary.main" color="primary.contrastText" px={2} mr={1} my={1} borderRadius={2}>
        <Typography py={0.5} variant='subtitle2'>{user}</Typography>
        <Typography pb={1} variant="body1">{text}</Typography>
      </Box>
      <Avatar alt={user} src={profileImage}/>
    </Box>
  )
}

export const Chat = () => {
  
  const { user, getPublicUserData } = useContext(UserContext);
  const { song } = useContext(SongContext);
  const { socket, isSocketConnected, joinRoom } = useContext(SocketContext);
  const { messages, addMessage } = useContext(MessageContext);
  const [isFirstConnection, setIsFirstConnection] = useState(true);

  const [message, setMessage] = useState('');

  useEffect(() => {    
    if (isSocketConnected && user.id && song.id && isFirstConnection){

      const userData = getPublicUserData();
    
      const {isPlaying, ...room } = song;

      joinRoom({userData, room});

      setIsFirstConnection(false);
    }

  }, [user, song])

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  }

  useEffect(() => {
    if (isSocketConnected && isFirstConnection ){
      
      socket.on("message", (message: Message) => {
        addMessage(message);
      });
    }

  }, [isSocketConnected]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    
    if(message){
      socket.emit("sendMessage", { message, username: user.displayName, profileImage: user.profileImage.url ,roomID: song.id });
      setMessage('');
    }
   }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages]);
  

  return (
    <Box 
      maxHeight="calc(100vh - 64px)" 
      display='flex' 
      flexDirection={'column'} 
      p={1}
    >
      <Box height="calc(100vh - 96px)" p={2} mb={1} sx={{overflowY:'auto'}}>
      {messages.map((val) => {
        return (
          <Box key={val.id} display='flex' flexDirection='column' alignItems='flext-start'>
              { (val.user === user.displayName) ?
                  <MessageRight
                    message={val}
                  />
                :
                  <MessageLeft 
                    message={val}
                  />
              }
          </Box>
        );
      })}
      <div ref={messagesEndRef} />
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box display='flex' alignItems='flex-end'>
              <TextField fullWidth variant="standard" value={message} onChange={(e) => setMessage(e.target.value)}/>
              <Button type="submit" variant="contained" color="primary">
                <SendIcon />
              </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}