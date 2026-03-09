const reveals = document.querySelectorAll('.reveal');
const isEnglishPage = document.documentElement.lang.toLowerCase().startsWith('en');

const uiText = isEnglishPage
  ? {
      formMissing: 'Please fill in required fields and accept the privacy policy before sending.',
      formEndpoint: 'Form configured. Add a valid endpoint (Formspree/API) in the data-endpoint attribute.',
      formSending: 'Sending...',
      formSuccess: 'Request sent successfully. I will get back to you soon.',
      formError: 'Sending is temporarily unavailable. Please contact me at: info@studioaurora.it',
      cookieAria: 'Cookie preferences',
      cookieBody:
        'This website uses technical cookies and, with consent, analytics cookies. You can accept or reject non-essential cookies.',
      cookieLinkLabel: 'Read the Cookie Policy',
      cookieReject: 'Reject',
      cookieAccept: 'Accept',
      cookieHref: 'cookie-en.html'
    }
  : {
      formMissing: 'Compila i campi obbligatori e accetta la privacy prima di inviare.',
      formEndpoint: 'Form configurato. Inserisci un endpoint reale (Formspree/API) nell’attributo data-endpoint.',
      formSending: 'Invio in corso...',
      formSuccess: 'Richiesta inviata con successo. Ti risponderò al più presto.',
      formError: 'Invio non disponibile al momento. Contattami via email: info@studioaurora.it',
      cookieAria: 'Preferenze cookie',
      cookieBody:
        'Questo sito utilizza cookie tecnici e, previo consenso, cookie analitici. Puoi accettare o rifiutare i cookie non essenziali.',
      cookieLinkLabel: 'Leggi la Cookie Policy',
      cookieReject: 'Rifiuta',
      cookieAccept: 'Accetta',
      cookieHref: 'cookie.html'
    };

if (reveals.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((item) => observer.observe(item));
}

const form = document.querySelector('#contactForm');
const statusEl = document.querySelector('#formStatus');

if (form && statusEl) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const privacy = data.get('privacy');

    if (!name || !email || !message || !privacy) {
      statusEl.textContent = uiText.formMissing;
      statusEl.style.color = '#9d4d58';
      return;
    }

    const endpoint = String(form.dataset.endpoint || '').trim();

    if (!endpoint || endpoint.includes('YOUR_FORMSPREE_ID')) {
      statusEl.textContent = uiText.formEndpoint;
      statusEl.style.color = '#9d4d58';
      return;
    }

    statusEl.textContent = uiText.formSending;
    statusEl.style.color = '#5b6570';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: data
      });

      if (!response.ok) {
        throw new Error('Invio non riuscito');
      }

      statusEl.textContent = uiText.formSuccess;
      statusEl.style.color = '#4d7b61';
      form.reset();
    } catch (_error) {
      statusEl.textContent = uiText.formError;
      statusEl.style.color = '#9d4d58';
    }
  });
}

const COOKIE_KEY = 'studio_aurora_cookie_consent_v1';

function saveCookieConsent(choice) {
  const payload = {
    choice,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));
}

function removeCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (banner) {
    banner.remove();
  }
}

function createCookieBanner() {
  const container = document.createElement('aside');
  container.className = 'cookie-banner';
  container.setAttribute('role', 'dialog');
  container.setAttribute('aria-label', uiText.cookieAria);

  container.innerHTML = `
    <p>
      ${uiText.cookieBody}
      <a href="${uiText.cookieHref}">${uiText.cookieLinkLabel}</a>.
    </p>
    <div class="cookie-actions">
      <button type="button" class="btn btn-soft" data-cookie-choice="reject">${uiText.cookieReject}</button>
      <button type="button" class="btn btn-primary" data-cookie-choice="accept">${uiText.cookieAccept}</button>
    </div>
  `;

  container.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const choice = target.dataset.cookieChoice;
    if (!choice) {
      return;
    }
    saveCookieConsent(choice);
    removeCookieBanner();
  });

  document.body.appendChild(container);
}

try {
  const rawConsent = localStorage.getItem(COOKIE_KEY);
  if (!rawConsent) {
    createCookieBanner();
  }
} catch (_error) {
  createCookieBanner();
}

function createSocialFloat() {
  const phoneNumber = '390212345678';
  const text = encodeURIComponent(
    isEnglishPage
      ? 'Hello, I would like to request information about a first consultation.'
      : 'Buongiorno, vorrei richiedere informazioni per un primo colloquio.'
  );

  const social = document.createElement('div');
  social.className = 'social-float';
  social.setAttribute('aria-label', 'Social quick contacts');

  social.innerHTML = `
    <a class="social-float-btn instagram" href="https://instagram.com/studioaurora.psicologia" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
      </svg>
    </a>
    <a class="social-float-btn facebook" href="https://facebook.com/studioaurora.psicologia" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.5-4.3 4.3V11H7v3h2.9v8h3.6Z"/>
      </svg>
    </a>
    <a class="social-float-btn whatsapp" href="https://wa.me/${phoneNumber}?text=${text}" target="_blank" rel="noopener noreferrer" aria-label="${
      isEnglishPage ? 'Contact us on WhatsApp' : 'Contattaci su WhatsApp'
    }">
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M19.11 17.36c-.27-.13-1.56-.77-1.8-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.16-1.35-.8-.71-1.35-1.59-1.51-1.86-.16-.27-.02-.41.11-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.98-.21-.51-.43-.44-.6-.45h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.21 0 1.3.95 2.56 1.08 2.74.13.18 1.86 2.85 4.51 4 .63.27 1.13.44 1.52.56.64.2 1.21.17 1.66.1.51-.08 1.56-.64 1.78-1.26.22-.62.22-1.15.16-1.26-.06-.11-.24-.18-.51-.31Z"/>
        <path fill="currentColor" d="M16.02 3.2c-7.05 0-12.77 5.72-12.77 12.78 0 2.24.58 4.42 1.69 6.35L3 29l6.83-1.79a12.72 12.72 0 0 0 6.19 1.58h.01c7.05 0 12.77-5.72 12.77-12.78S23.08 3.2 16.02 3.2Zm0 23.46h-.01a10.72 10.72 0 0 1-5.46-1.5l-.39-.23-4.05 1.06 1.08-3.95-.25-.41a10.7 10.7 0 0 1-1.65-5.63c0-5.91 4.81-10.72 10.73-10.72 2.86 0 5.55 1.11 7.57 3.14a10.64 10.64 0 0 1 3.14 7.58c0 5.92-4.81 10.73-10.72 10.73Z"/>
      </svg>
    </a>
  `;

  document.body.appendChild(social);

  const animate = () => {
    const phase = window.scrollY * 0.02;
    const drift = Math.sin(phase) * 7;
    social.style.setProperty('--social-drift', `${drift}px`);
  };

  window.addEventListener('scroll', animate, { passive: true });
  animate();
}

createSocialFloat();
