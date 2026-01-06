import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-intro">
          Have questions, feedback, or need support? We’d love to hear from you!
          Reach out to us using the details below.
        </p>

        <div className="contact-info">
          <div className="contact-card">
            <h3>📍 Address</h3>
            <p>GoodFood HQ, New Road, Pokhara, Nepal</p>
          </div>

          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>+977-9866344775</p>
          </div>

          <div className="contact-card">
            <h3>📧 Email</h3>
            <p>support@goodfood.com</p>
          </div>
        </div>

        <form className="contact-form">
          <h3>Send us a message</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
