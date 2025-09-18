import "./styles.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Projects from "./components/Projects/Projects";
import ContactForm from "./components/Contact/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Profile />
        <Projects />
        <section id="contact" className="container-fluid py-5 last-container">
          <div className="container">
            <h2 className="fw-bold text-center mb-4" id="contact_anchor">CONTACT</h2>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
