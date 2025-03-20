import Navbar from "./Navbar"
import PrivateNavbar from "./PrivateNavbar"

const NavbarCont = () => {
    return import.meta.env.VITE_BRANCH === "dev" || import.meta.env.VITE_BRANCH === "main"
     ? 
    <Navbar /> : <PrivateNavbar />
}

export default NavbarCont