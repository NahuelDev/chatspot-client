import { useContext, useEffect, useRef, useState } from "react";
import { Room, SongStatus } from "../interfaces";
import { SongContext } from "./SongContext";
import SpotifyWebAPI from "spotify-web-api-js";
import { getUserAccessToken, hasTokenSaved } from "../utils/user";
import { UserContext } from "./UserContext";
import { SocketContext } from "./SocketContext";
interface Props {
    children: React.ReactNode;
};

//Spotify Config
const spotifyAPI = new SpotifyWebAPI();

if(hasTokenSaved()){
    const accessToken = getUserAccessToken();
    spotifyAPI.setAccessToken(accessToken);
}


export const SongProvider = ({ children } : Props) => {
    
    const { getPublicUserData } = useContext(UserContext);
    const { joinRoom, isSocketConnected } = useContext(SocketContext);

    const [song, setSong] = useState({} as SongStatus);
    const prevSongIdRef = useRef<string>('');

    const getSongAndUserData = (data: SpotifyApi.CurrentlyPlayingResponse) => {
        const image = data.item?.album.images[0].url || 'https://picsum.photos/300';

            const songRes: SongStatus = {
                id: data.item?.id || '',
                isPlaying: data.is_playing,
                name: data.item?.name || '',
                album: data.item?.album.name || '',
                band: data.item?.artists[0].name || '',
                image
            }

            const userData = getPublicUserData();

            return {songRes, userData};
    }

    const getSongFirstTime = () => {
        spotifyAPI.getMyCurrentPlayingTrack({}, (err, data) => {
            if (err) console.log('Something wrong!! ', err);
            
            const {songRes, userData} = getSongAndUserData(data);
            
            const {isPlaying, ...room } = songRes;
            prevSongIdRef.current = songRes.id;

            setSong(songRes);
            if (isSocketConnected) {
                joinRoom({userData, room})
            }
        });
    }

    const setCurrentSong = () => {
    
          spotifyAPI.getMyCurrentPlayingTrack({}, (err,data) => {
            if (err) console.log('Something wrong!! ', err);
            if (prevSongIdRef.current === data.item?.id) return;
            
            const {songRes, userData} = getSongAndUserData(data);
            const {isPlaying, ...room } = songRes;

            if(prevSongIdRef.current !== songRes.id && isSocketConnected){    
                setSong(songRes);
                prevSongIdRef.current = songRes.id;
                joinRoom({userData, room});
            }
        });
      };

    const changeSong = (room: Room) => { 
        spotifyAPI.play({uris: [`spotify:track:${room.id}`]}, (err) => {
            if (err) console.log('Something wrong!!! ', err);
            const newSong = {...room, isPlaying: true};
            setSong(newSong);
            prevSongIdRef.current = newSong.id;
            const userData = getPublicUserData();
            joinRoom({userData, room});
        })
     }

    const pauseOrResumeSong = () => {
        song.isPlaying ? spotifyAPI.pause() : spotifyAPI.play();
        setSong({
            ...song,
            isPlaying: !song.isPlaying
        });
    }

    const skipNextSong = async () => {
        spotifyAPI.skipToNext({}, async (err) => {
            if (err) console.log('Something wrong!! ', err);
        });
    }

    const skipPreviousSong = () => {
      spotifyAPI.skipToPrevious({}, async (err) => {
        if (err) console.log('Something wrong!! ', err);
      });
    };

    useEffect(() => {
        if(hasTokenSaved()){
            getSongFirstTime()
        }
    }, []);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if(hasTokenSaved()){
                setCurrentSong();
            }
        }, 5000);
    
        return () => clearInterval(intervalId);
    }, [song]);

    

    

    return (
        <SongContext.Provider
            value={{
                song,
                changeSong,
                pauseOrResumeSong,
                skipNextSong,
                skipPreviousSong
            }}
        >
            {children}
        </SongContext.Provider>
    )
}