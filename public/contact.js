// Contact form: validate name and email, submit with fetch, and show the
// result on the page. Without JavaScript the browser checks the same rules
// (required, minlength, pattern) and Formspree shows its own confirmation
// page. Kept as an external file so it works under a CSP of script-src 'self'.
(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  if (!form || !status || !window.fetch) return;

  // We show our own messages, so turn off the browser's pop-up bubbles.
  form.noValidate = true;

  var EMAIL = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/;

  var fields = [
    {
      input: document.getElementById('cf-name'),
      error: document.getElementById('cf-name-error'),
      check: function (v) {
        return v.replace(/\s/g, '').length >= 2 ? '' : 'Please enter your name.';
      },
    },
    {
      input: document.getElementById('cf-email'),
      error: document.getElementById('cf-email-error'),
      check: function (v) {
        return EMAIL.test(v) ? '' : 'Please enter a valid email, like you@example.com.';
      },
    },
  ];

  function validate(field) {
    var message = field.check(field.input.value.trim());
    field.error.textContent = message;
    field.error.hidden = !message;
    field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  fields.forEach(function (field) {
    if (!field.input || !field.error) return;
    // Check when the person leaves the field, then live while they fix it.
    field.input.addEventListener('blur', function () {
      if (field.input.value) validate(field);
    });
    field.input.addEventListener('input', function () {
      if (field.input.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });

  function showStatus(ok, title, text) {
    status.textContent = '';
    status.className = 'cf-status ' + (ok ? 'cf-ok' : 'cf-fail');
    var icon = document.createElement('span');
    icon.className = 'cf-icon';
    icon.setAttribute('aria-hidden', 'true');
    var strong = document.createElement('strong');
    strong.textContent = title;
    var body = document.createElement('span');
    body.textContent = ' ' + text;
    var copy = document.createElement('span');
    copy.appendChild(strong);
    copy.appendChild(body);
    status.appendChild(icon);
    status.appendChild(copy);
    status.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!validate(field) && !firstInvalid) firstInvalid = field.input;
    });
    var message = document.getElementById('cf-message');
    if (message && !message.value.trim()) {
      message.setAttribute('aria-invalid', 'true');
      if (!firstInvalid) firstInvalid = message;
    } else if (message) {
      message.setAttribute('aria-invalid', 'false');
    }
    if (firstInvalid) {
      firstInvalid.focus();
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
        showStatus(true, 'Delivered.', 'Your message passed every check and is in my inbox. I’ll get back to you soon.');
      })
      .catch(function () {
        if (button) button.disabled = false;
        showStatus(false, 'Not delivered.', 'Something went wrong on the way. Please try again, or message me on LinkedIn.');
      });
  });
})();
