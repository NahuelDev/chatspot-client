import { Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';

const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;
const redirectURI = import.meta.env.VITE_REDIRECT_URI;
const clientId = import.meta.env.VITE_CLIENT_ID;

const scopes = import.meta.env.VITE_SPOTIFY_SCOPES.split(", ");

const loginURL = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}`;

export const LoginButton = () => {
  return (
    <Button
                  variant="text"
                  color="secondary"
                  startIcon={<LoginIcon />}
                  href={loginURL}
                >
                  Login
                </Button>
  )
}
