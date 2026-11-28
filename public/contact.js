// Contact form: submit with fetch and show a thank-you message on the page.
// Without JavaScript the form posts normally and Formspree shows its own
// confirmation page. Kept as an external file so it works under a CSP of
// script-src 'self'.
(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  if (!form || !status || !window.fetch) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    status.hidden = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        form.reset();
        form.hidden = true;
        status.textContent = 'Thanks. Your message was sent.';
        status.hidden = false;
      })
      .catch(function () {
        if (button) button.disabled = false;
        status.textContent = 'The message could not be sent. Please try again, or use LinkedIn.';
        status.hidden = false;
      });
  });
})();
