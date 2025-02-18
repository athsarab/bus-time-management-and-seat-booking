import React from 'react';

const ContactUs = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
    <h1>Contact Us</h1>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <h2>Get in Touch</h2>
        <p>Feel free to reach out to us via phone or email with any inquiries or feedback.</p>
        <div style={{ marginBottom: '10px' }}>
          <strong>Phone:</strong> (+94)41-2264450
        </div>
        <div>
          <strong>Email:</strong> <a href="mailto:info@suncitybus.com">info@suncitybus.com</a>
        </div>
      </div>
      <div style={{ flex: 1 }}>
      <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1586855.543178473!2d79.60739513994218!3d7.8774227388204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24653e1f7082d%3A0xfcc08a75c2ab24b3!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1651314996050!5m2!1sen!2sus" width="400" height="300" allowFullScreen="" loading="lazy" style={{ width: '100%', height: '300px', border: 'none' }}></iframe>
          </div>
    </div>
  </div>
  )
}

export default ContactUs;
