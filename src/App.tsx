// @ts-ignore
import "@fontsource/michroma"
//@ts-ignore
import "@fontsource/montserrat"
// import "@fontsource/zen-kaku-gothic-antique"
import Box from "@mui/material/Box";
// @ts-ignore
import NavbarCont from "./Components/NavbarCont";
import Footer from "./Components/Footer";
import Router from "./Router/Router";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Michroma",
    body1: {
      fontFamily: "Montserrat"
    },
    h6: {
      fontFamily: "Montserrat"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#faebeb"
        }
      }
    }
  }
});

//#faebeb

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}>
        <NavbarCont />
        <Router />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
