import axios from "axios";

const ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;

const isTokenExpired = () => {
    const isExpired = new Date(localStorage.getItem("expired_time") || Date.now() - 60*60*1000).getTime() <= Date.now();

    return isExpired;
}

const getUserAccessToken = () => { 
    let accessToken = localStorage.getItem("access_token") || '';
    
    accessToken = isTokenExpired() ? updateAccessToken() : accessToken;

    return accessToken;

};

const hasTokenSaved = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const accessToken = localStorage.getItem("access_token");
    
    return (accessToken || refreshToken);
}

const updateAccessToken = () => {
    const refreshTokenURL = `${ENDPOINT}/api/token/refresh`;
    let accessToken = '';
    const refreshToken = localStorage.getItem("refresh_token") || '';
    
    axios.post(refreshTokenURL, {refreshToken})
    .then(res => {
        accessToken = res.data.accessToken;
        if (!accessToken) return;
        localStorage.setItem("access_token", accessToken);

        //Spotify access token expires in 1 hour
        const expiration = new Date(Date.now() + 60*60*1000).toString();
        localStorage.setItem("expired_time", expiration)
    },
        (err) => {
            console.log(err);
    });

    return accessToken;
}

export {
    getUserAccessToken,
    hasTokenSaved,
    isTokenExpired
}
