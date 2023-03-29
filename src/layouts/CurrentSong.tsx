import { CardMedia,CardContent, Box, Typography, Card, IconButton, keyframes } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import { useContext } from "react";
import { SongContext } from "../context/SongContext";
import { UserContext } from "../context/UserContext";

const slideText = keyframes`
    from, 0, to{
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
    25% {
        -webkit-transform: translateX(-25%);
        transform: translateX(-25%);
    }
    
    50% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }

    75% {
        -webkit-transform: translateX(25%);
        transform: translateX(25%);
    }

    100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
`;

export const CurrentSong = () => {

    const { song, pauseOrResumeSong, skipNextSong, skipPreviousSong } = useContext(SongContext);
    const { isPremium } = useContext(UserContext);

    const getAnimationTime = () => {

        let animationTime = '20s';

        if (song.name?.length <= 20) {
            animationTime = '0s';
        }

        return `${slideText} ${animationTime} linear infinite`
    }

  return (
        <Card sx={{ display: 'flex', height: '140px' }}>
            <CardMedia
                component="img"
                sx={{width: '140px', height: '100%', zIndex: 1 }}
                image={song.image}
                alt={song.album}
            />
            <Box sx={{display:'flex', flexDirection: 'column'}}>
                <CardContent>
                    <Typography component="p" variant="h6" width={'100%'} sx={{whiteSpace: 'nowrap', animation: getAnimationTime() }}>
                        {song.name}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        {song.band}
                    </Typography>
                    <Box>
                        <IconButton disabled={!isPremium()} onClick={() => skipPreviousSong()}>
                            <SkipPreviousIcon/>
                        </IconButton>
                        <IconButton onClick={() => pauseOrResumeSong()} aria-label={song.isPlaying ? 'pause' : 'play'}>
                            {song.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton disabled={!isPremium()} onClick={() => skipNextSong()}>
                            <SkipNextIcon/>
                        </IconButton>
                    </Box>
                </CardContent>
            </Box>
        </Card>
  )
}
