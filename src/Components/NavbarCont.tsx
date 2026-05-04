import Navbar from "./Navbar";
import PrivateNavbar from "./PrivateNavbar";

const NavbarCont = () => {
  return import.meta.env.VITE_ENVIRONMENT === "private" ? (
    <PrivateNavbar />
  ) : (
    <Navbar />
  );
};

export default NavbarCont;
