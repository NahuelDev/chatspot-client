import { Box, Grid, Typography  } from "@mui/material";
import { LoginButton } from "../components";

export const LoginPage = () => {  

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height={'calc(100vh - 64px)'}>
        <Typography variant='subtitle1'>Log In with your spotify account to chat with people around the world!</Typography>
        <LoginButton />
    </Box>
  )
}