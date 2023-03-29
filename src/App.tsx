import { MessageProvider } from './context/MessageProvider';
import { SocketProvider } from './context/SocketProvider';
import { SongProvider } from './context/SongProvider';
import { UserProvider } from './context/UserProvider';
import { Dashboard, Header } from './layouts';
import { getInitialTheme } from './utils/theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from 'react';
import { isTokenExpired } from './utils/user';
import { LoginPage } from './layouts/LoginPage';




const code = new URLSearchParams(window.location.search).get('code') || '';
const accessToken = isTokenExpired() ? '' : localStorage.getItem("access_token");

const INITIAL_THEME = getInitialTheme();


function App() {

  const [theme, setTheme] = useState(INITIAL_THEME);

  return (
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <SocketProvider>
          <UserProvider>
            <SongProvider>
                <CssBaseline />
                <Header theme={theme} setTheme={setTheme}/>
                { (code || accessToken) ? <Dashboard code={code} /> : <LoginPage />} 
            </SongProvider>
          </UserProvider>
        </SocketProvider>
      </MessageProvider>
    </ThemeProvider>
  )
}

export default App;