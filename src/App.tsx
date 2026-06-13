import Box from "@mui/material/Box";
import NavbarCont from "./Components/NavbarCont";
import Footer from "./Components/Footer";
import Router from "./Router/Router";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Michroma",
    body1: {
      fontFamily: "Montserrat",
    },
    h6: {
      fontFamily: "Montserrat",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#faebeb",
        },
      },
    },
  },
});

//#faebeb

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // fallback for older browsers
          "@supports (height: 100dvh)": {
            height: "100dvh",
          },
          justifyContent: "space-between",
        }}
      >
        <NavbarCont />
        <Router />
        {import.meta.env.VITE_ENVIRONMENT !== "onsite" ? (
          <Footer />
        ) : (
          <Box></Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
