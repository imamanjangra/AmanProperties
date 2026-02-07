import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import ContactButtons from "../components/ContactButtons";

export default function Layout() {
  return (
    <div > 
      <Navbar />
      <main >
        <Outlet />
      </main>
      <Footer />
      <ContactButtons/>
    </div>
  );
}