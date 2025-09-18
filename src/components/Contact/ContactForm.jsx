import { useEffect, useState } from "react";
import { initEmail, sendContact } from "../../lib/email";

export default function ContactForm() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"", website:"" });
  const [alert, setAlert] = useState({ type:"", msg:"", show:false });

  useEffect(() => { initEmail(); }, []);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    if (!form.name || !form.email || !form.message) {
      return setAlert({ type:"warning", msg:"Please fill in required fields.", show:true });
    }
    try {
      await sendContact({ name: form.name, email: form.email, subject: form.subject, message: form.message });
      setAlert({ type:"success", msg:"Thanks! Your message has been sent.", show:true });
      setForm({ name:"", email:"", subject:"", message:"", website:"" });
    } catch {
      setAlert({ type:"danger", msg:"Sorry, something went wrong. Please try again.", show:true });
    }
  };

  return (
    <div className="row g-4 justify-content-center">
      <div className="col-12 col-lg-5">
        <div className="contact-card h-100 text-center">
          <h4 className="mb-3">Get in Touch</h4>
          <p className="text-muted small">Feel free to reach out for collaboration or just a friendly hello.</p>
          <div className="socials d-flex justify-content-center align-items-center gap-4 flex-nowrap">
            <a className="btn btn-outline-brand btn-icon" href="https://www.linkedin.com/in/ayakokaneko" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in" /></a>
            <a className="btn btn-outline-brand btn-icon" href="https://github.com/ayakoneko" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" /></a>
            <a className="btn btn-outline-brand btn-icon" href="mailto:ayako.kaneko1997@gmail.com"><i className="fa-solid fa-envelope" /></a>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="contact-card">
          <h4 className="mb-3">Message Me</h4>
          <div id="contactAlert" className={`alert ${alert.show ? "" : "d-none"} alert-${alert.type}`} role="alert" aria-live="polite">{alert.msg}</div>

          <form onSubmit={onSubmit} noValidate>
            <input type="text" name="website" className="d-none" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
            <div className="mb-3"><label className="visually-hidden" htmlFor="cName">Your Name</label><input id="cName" name="name" className="form-control contact-input" placeholder="Your Name*" value={form.name} onChange={onChange} required /></div>
            <div className="mb-3"><label className="visually-hidden" htmlFor="cEmail">Your Email</label><input id="cEmail" name="email" type="email" className="form-control contact-input" placeholder="Your Email*" value={form.email} onChange={onChange} required /></div>
            <div className="mb-3"><label className="visually-hidden" htmlFor="cSubject">Subject</label><input id="cSubject" name="subject" className="form-control contact-input" placeholder="Subject" value={form.subject} onChange={onChange} /></div>
            <div className="mb-3"><label className="visually-hidden" htmlFor="cMessage">Your Message</label><textarea id="cMessage" name="message" rows={4} className="form-control contact-input" placeholder="Your Message*" value={form.message} onChange={onChange} required /></div>
            <button className="btn btn-send btn-outline-brand d-inline-flex align-items-center gap-2" type="submit"><i className="fa-solid fa-paper-plane" />Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
