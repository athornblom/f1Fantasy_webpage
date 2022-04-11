import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#e73733",
      main: "#E10600",
      dark: "#9d0400",
      contrastText: "#fff",
    },
    secondary: {
      light: "#33bfff",
      main: "#00b0ff",
      dark: "#007bb2",
      contrastText: "#000",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#e73733",
      main: "#E10600",
      dark: "#9d0400",
      contrastText: "#fff",
    },
    secondary: {
      light: "#33bfff",
      main: "#00b0ff",
      dark: "#007bb2",
      contrastText: "#000",
    },
  },
});
