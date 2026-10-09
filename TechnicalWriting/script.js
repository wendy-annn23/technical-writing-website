document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '×' : '☰';
    });
  }

  // Highlight the current main page
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // Client-side demo contact form. No message is stored or sent by this website.
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      const status = form.querySelector('[data-form-status]');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        if (status) status.textContent = 'Please complete all fields.';
        return;
      }
      if (!emailPattern.test(email)) {
        if (status) status.textContent = 'Please enter a valid email address.';
        form.querySelector('[name="email"]').focus();
        return;
      }

      const target = form.dataset.email;
      if (!target || target.includes('your-email@example.com')) {
        if (status) status.textContent = 'Please replace the sample recipient email in contact.html before using this form.';
        return;
      }
      const subject = encodeURIComponent('Technical Writing website message from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      if (status) status.textContent = 'Opening your email application. Review the message there and send it yourself.';
      window.location.href = `mailto:${target}?subject=${subject}&body=${body}`;
    });
  }
});
