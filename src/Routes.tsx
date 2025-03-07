import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import App404 from "./Pages/App404";

function Router() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<App404 />} />
    </Routes>
  );
}

export default Router;