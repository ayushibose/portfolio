import emailjs from 'emailjs-com';
import { useState } from 'react';

export default function Contact({ open, onClose }) {
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_e7ezqzl', 'template_ghztrvv', e.target, 'plE95eo0Rz3lG7rh2')
      .then(() => setSent(true))
      .catch((error) => console.error(error));
  };

  if (!open) return null;

  return (
    <div className="aboutme-modal">
      <div className="aboutme-modal-content">
        <button className="aboutme-close" onClick={onClose}>&times;</button>
        <h2>Drop me a message</h2>
        <form onSubmit={sendEmail} className="contact-form">
          <input name="name" type="text" placeholder="Your Name" required />
          <input name="email" type="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required />
          <button type="submit">
            Send Message
          </button>
          {sent && <p className="text-green-600">Thanks! Your message has been sent.</p>}
        </form>
      </div>
    </div>
  );
}
