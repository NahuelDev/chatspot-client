import { AppBar, Avatar, Box, Button, Toolbar, Theme, IconButton } from "@mui/material"
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { isLightTheme, saveThemeOnLocalStorage } from "../utils/theme";
import { darkTheme, lightTheme } from "../themes/";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { LoginButton } from "../components";

interface Props {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const Header = ({theme, setTheme}: Props) => {

  const {user} = useContext(UserContext);

  useEffect(() => {
      saveThemeOnLocalStorage(theme);
  }, [theme]);

  const handleChangeTheme = () => {
      setTheme((prevTheme) =>
          isLightTheme(prevTheme) ? darkTheme : lightTheme
      );
  };

  return (
    <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <Button
                variant="text"
                color="secondary"
                startIcon={<VoiceChatIcon />}
            >
                CHATSPOT
            </Button>
            {
              user.id ?
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                  <IconButton
                        onClick={handleChangeTheme}
                        sx={{
                            color: isLightTheme(theme)
                                ? lightTheme.palette.secondary.main
                                : darkTheme.palette.primary.main
                        }}
                    >
                        {isLightTheme(theme) ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )}
                  </IconButton>
                  <Avatar alt="user" src={user.profileImage.url} />
                  {user.displayName}
                </Box>
              : <LoginButton />
            }
            

        </Toolbar>
    </AppBar>
  )
}
