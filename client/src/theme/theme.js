import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 685,
      laptop: 900,
    },
  },
  typography: {
    fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: 16,
    button: {
      textTransform: "none", // Allows displaying lowercase in <Buttons />
      fontWeight: "bold",
    },
  },
  palette: {
    background: {
      paper: "#FFFFFF",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    primary: {
      main: "#005BBB",
    },
    secondary: {
      main: "#FFD500",
    },
    action: {
      main: "#001E3C",
    },
    success: {
      main: "#009688",
    },
  },
});

export default theme;
