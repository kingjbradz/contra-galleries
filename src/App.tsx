import { Route, Routes } from "react-router";
import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import App404 from "./Pages/App404";
import Footer from "./Components/Footer";

function App() {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/about" element={<About />} />

          <Route path="gallery">
            <Route index element={<Gallery />} />
            <Route path=":id" element={<>g item</>} />
          </Route>


          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<App404 />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;