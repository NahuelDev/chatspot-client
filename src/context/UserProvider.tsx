import { useEffect, useState } from "react";
import { User } from "../interfaces";
import { UserContext } from "./UserContext";
import SpotifyWebAPI from "spotify-web-api-js";
import { getUserAccessToken, hasTokenSaved } from "../utils/user";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
interface Props {
    children: React.ReactNode;
};

//Spotify Config
const spotifyAPI = new SpotifyWebAPI();

if(hasTokenSaved()){
    const accessToken: string= getUserAccessToken();
    spotifyAPI.setAccessToken(accessToken);
}


export const UserProvider = ({ children } : Props) => {
    
    const [user, setUser] = useState({} as User);
    const [isUserLoaded, setIsUserLoaded] = useState(false);


    const setAccessAndRefreshToken = (code: string) => { 
        const getTokensURL = `${ENDPOINT}/api/token/`;
        axios.post(getTokensURL, { code })
        .then(res => {
            window.history.pushState({}, '', '/');
            const { accessToken, refreshToken } = res.data;
            const expiration = new Date(Date.now() + 60*60*1000).toString();
            if (!accessToken) return;
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("expired_time", expiration);
            window.location.reload();
        },
            (err) => {
                console.error(err);
        });
    }

    const setCurrentUser = (accessToken ?: string) => { 
        if (accessToken) spotifyAPI.setAccessToken(accessToken);
        spotifyAPI.getMe({}, (err,data) => {
            if (err) console.log('Something wrong!! ', err);
            const image = data.images ? data.images[0] : {
                url: 'https://picsum.photos/300',
                height: 200,
                width: 200
            };

            const isPremium = data.product === "premium";
            
            const userRes: User = {
                displayName: data.display_name || `user${data.id}`,
                email: data.email,
                country: data.country,
                id: data.id,
                profileImage: {
                    url: image?.url || 'https://picsum.photos/id/237/300/300',
                    height: image?.height || 100,
                    width: image?.width || 100
                },
                isPremium
            }

            setUser(userRes);
    })};

    const isPremium = () => user.isPremium;

    useEffect(() => {
        if(hasTokenSaved()){

            setCurrentUser();
            setIsUserLoaded(true);

        }
    }, []);

    const getPublicUserData = () => { 
        return {
            id: user.id,
            username: user.displayName,
            country: user.country
        }
     }
    
    return (
        <UserContext.Provider
            value={{
                user,
                isUserLoaded,
                getPublicUserData,
                setAccessAndRefreshToken,
                isPremium
            }}
        >
            {children}
        </UserContext.Provider>
    )
}