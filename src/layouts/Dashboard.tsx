import { Grid } from "@mui/material";
import { useContext } from "react";
import { Chat, LeftSidebar } from ".";
import { UserContext } from "../context/UserContext";
interface Props{
  code: string;
}

export const Dashboard = ({ code }: Props) => {

  const { setAccessAndRefreshToken } = useContext(UserContext);
  
  if (code) setAccessAndRefreshToken(code);

  return (
    <Grid container spacing={2} direction={["column-reverse","column-reverse", "row"]}>
      <Grid item xs={12} md={4} xl={3} zeroMinWidth>
        <LeftSidebar />
      </Grid>
      <Grid item xs={12} md={8} xl={9}>
        <Chat />
      </Grid>
    </Grid>
  )
}