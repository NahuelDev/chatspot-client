import { createTheme } from "@mui/material";

const primary = {
    main: "#568C14",
};
const secondary = {
    main: "#fff",
};

const status = {
    error: "#ff1744",
};

const background = {
    default: "#000",
};

export const darkTheme = createTheme({

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*::-webkit-scrollbar': {
                    width: '10px',
                  },
                  '*::-webkit-scrollbar-track': {
                    background: '#232E33',
                    borderRadius: '10px',
                  },
                  '*::-webkit-scrollbar-thumb': {
                    background: '#568c14',
                    borderRadius: '10px',
                  },
            }
        },
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
        },
        MuiIconButton: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    color: primary.main
                },
            },
        },
    },

    palette: {
        background: {
            default: background.default
        },
        error: { 
            main: status.error
        },
        mode: "dark",
        primary: {
            main: primary.main
        },
        secondary: {
            main: secondary.main
        },
    }
    
});
