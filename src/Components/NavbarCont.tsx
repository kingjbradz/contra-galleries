import Navbar from "./Navbar"
import AltNavbar from "./AltNavbar"

const NavbarCont = () => {
    return import.meta.env.VITE_BRANCH !== "dev" 
    // || import.meta.env.VITE_BRANCH === "main"
     ? 
    <Navbar /> : <AltNavbar />
}

export default NavbarCont