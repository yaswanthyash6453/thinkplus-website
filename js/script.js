// Basic UI interactions: mobile nav, smooth scroll, simple form validation, year setter
document.addEventListener('DOMContentLoaded', () => {
  // update year in footers
  const y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // mobile nav toggle
  const navToggle = document.querySelectorAll('#nav-toggle');
  navToggle.forEach(btn=>{
    btn.addEventListener('click', () => {
      const nav = document.querySelector('.nav-list');
      if(nav.style.display === 'flex' || window.innerWidth > 700){
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
      }
    });
  });

  // close mobile nav on link click
  document.querySelectorAll('.nav-list a').forEach(a=>{
    a.addEventListener('click', () => {
      if(window.innerWidth <= 700){
        const nav = document.querySelector('.nav-list');
        nav.style.display = 'none';
      }
    });
  });

  // smooth scrolling for in-page anchors (if used)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const el = document.querySelector(this.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // contact form validation & fake submit (replace with EmailJS or server)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const alertBox = document.getElementById('formAlert');

      if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
        alertBox.hidden = false;
        alertBox.textContent = 'Please fill in the required fields.';
        setTimeout(()=> alertBox.hidden = true, 3500);
        return;
      }

      // Basic email format check
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRe.test(email.value)){
        alertBox.hidden = false;
        alertBox.textContent = 'Please enter a valid email address.';
        setTimeout(()=> alertBox.hidden = true, 3500);
        return;
      }

      // TODO: Integrate EmailJS or server endpoint to send the data.
      // For demo, we'll show success message:
      alertBox.hidden = false;
      alertBox.textContent = 'Thanks! Your message has been submitted. We will contact you soon.';
      contactForm.reset();
      setTimeout(()=> alertBox.hidden = true, 4000);
    });
  }
});
