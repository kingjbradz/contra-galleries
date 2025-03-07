import Box from "@mui/material/Box";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Router from "./Router";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}>
      <Navbar />
      <Router />
      <Footer />
    </Box>
  );
}

export default App;
