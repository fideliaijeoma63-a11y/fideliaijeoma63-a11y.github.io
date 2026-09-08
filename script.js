document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Typewriter effect on hero tagline ---------- */
const tagline = document.querySelector('.hero p');
if (tagline && !reduceMotion) {
  const fullText = tagline.textContent;
  tagline.textContent = '';
  let i = 0;
  const type = () => {
    if (i < fullText.length) {
      tagline.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, 22);
    }
  };
  setTimeout(type, 600);
}

/* ---------- Scroll-reveal ---------- */
 /* ---------- Typed paragraph in About section ---------- */
document.querySelectorAll('.typed-output').forEach(el => {
  /* ---------- Projects carousel: active highlight + dots + expand ---------- */
const carousel = document.getElementById('projectCarousel');
const track = document.getElementById('projectTrack');
const dotsWrap = document.getElementById('carouselDots');

if (carousel && track && dotsWrap) {
  const slides = Array.from(track.querySelectorAll('.project-slide'));

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = slides.indexOf(entry.target);
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        entry.target.classList.add('active');
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { root: carousel, threshold: [0.6] });

  slides.forEach(slide => slideObserver.observe(slide));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slides[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  slides.forEach(slide => {
    const btn = slide.querySelector('.more-btn');
    const details = slide.querySelector('.project-details');
    if (!btn || !details) return;
    btn.addEventListener('click', () => {
      const isOpen = details.classList.toggle('open');
      btn.classList.toggle('expanded', isOpen);
      btn.textContent = isOpen ? 'Less ' : 'More';
    });
  });
}
  /* ---------- Order form: WhatsApp / Email send + voice input ---------- */
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  const nameInput = document.getElementById('clientName');
  const detailsInput = document.getElementById('orderDetails');
  const whatsappBtn = document.getElementById('sendWhatsapp');
  const emailBtn = document.getElementById('sendEmail');
  const micBtn = document.getElementById('micBtn');

  const WHATSAPP_NUMBER = '2347040349646'; // <-- your number, country code, no + or spaces
  const YOUR_EMAIL = 'fideliaijeoma63@gmail.com';    // <-- your real email

  function getFormValues() {
    return { name: nameInput.value.trim(), details: detailsInput.value.trim() };
  }

  function validate() {
    const { name, details } = getFormValues();
    if (!name || !details) {
      alert('Please fill in your name and describe what you need first.');
      return false;
    }
    return true;
  }

  whatsappBtn.addEventListener('click', () => {
    if (!validate()) return;
    const { name, details } = getFormValues();
    const message = `Hi, I'm ${name}. I'd like to request a website:\n\n${details}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  });

  emailBtn.addEventListener('click', () => {
    if (!validate()) return;
    const { name, details } = getFormValues();
    const subject = `Website Request from ${name}`;
    const body = `${details}\n\n— ${name}`;
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition && micBtn) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    let listening = false;

    recognition.addEventListener('result', (e) => {
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript;
      detailsInput.value = transcript;
    });

    recognition.addEventListener('end', () => {
      listening = false;
      micBtn.classList.remove('listening');
    });

    micBtn.addEventListener('click', () => {
      if (listening) { recognition.stop(); }
      else { recognition.start(); listening = true; micBtn.classList.add('listening'); }
    });
  } else if (micBtn) {
    micBtn.style.display = 'none';
  }
}
  const text = el.dataset.text || '';
  el.textContent = '';

  if (reduceMotion) {
    el.textContent = text;
    return;
  }

  const typedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let i = 0;
        const type = () => {
          if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 18);
          }
        };
        type();
        typedObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  typedObserver.observe(el);
});
  /* ---------- Animated stat counters ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';

  if (reduceMotion) {
    el.textContent = target + suffix;
    return;
  }

  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Interactive particle constellation background ---------- */
if (!reduceMotion) {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '-1',
    pointerEvents: 'none'
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let w, h, particles;
  let pointer = { x: null, y: null, active: false };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const density = window.innerWidth < 600 ? 45 : 90;

  function makeParticles() {
    particles = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5
    }));
  }
  makeParticles();

  const linkDist = 130;
  const accent = 'rgba(255, 107, 53,';   // --accent
  const accent2 = 'rgba(79, 209, 197,';  // --accent-2
  const dotColor = 'rgba(232, 237, 244,';

  function step() {
    ctx.clearRect(0, 0, w, h);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // gentle push away from pointer/touch
      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dotColor + '0.5)';
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < linkDist) {
          const opacity = (1 - dist / linkDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = (i % 2 === 0 ? accent : accent2) + opacity + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }
  step();

  function setPointer(x, y) {
    pointer.x = x; pointer.y = y; pointer.active = true;
  }
  window.addEventListener('pointermove', e => setPointer(e.clientX, e.clientY));
  window.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (t) setPointer(t.clientX, t.clientY);
  }, { passive: true });
  window.addEventListener('pointerleave', () => pointer.active = false);
  window.addEventListener('touchend', () => pointer.active = false);
}

/* ---------- Magnetic hover on the CTA button ---------- */
const btn = document.querySelector('.btn');
if (btn && !reduceMotion) {
  btn.addEventListener('pointermove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('pointerleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
}
/* ---------- Social buttons stagger entrance ---------- */
const socialLinks = document.querySelector('.social-links');
if (socialLinks) {
  const socialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        socialObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  socialObserver.observe(socialLinks);
}