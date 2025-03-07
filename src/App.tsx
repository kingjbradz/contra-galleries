import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import App404 from "./Pages/App404";

function App() {

  return (
    <Routes>
      <Route index element={<Home />}/>

      <Route path="gallery">
        <Route index element={<Gallery />} />
        <Route path=":id" element={<>g item</>} />
      </Route>

      
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<App404 />} />
    </Routes>
  );
}

export default App;