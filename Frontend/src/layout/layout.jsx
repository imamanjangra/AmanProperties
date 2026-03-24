import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ContactButtons from "../components/ContactButtons.jsx";
import FloatingContactCard from "../components/FloatingContactCard.jsx";

export default function Layout() {
  return (
    <div > 
      <Navbar  variant="dark" />
      <main >
        <Outlet />
      </main>
      <Footer />
      <ContactButtons/>
      <FloatingContactCard/>
    </div>
  );
}