const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

reveals.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll('[data-count]');

const animateCount = (element) => {
  const target = Number(element.dataset.count);
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = value.toLocaleString('vi-VN');

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = target.toLocaleString('vi-VN');
    }
  };

  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.6,
});

counters.forEach((counter) => countObserver.observe(counter));