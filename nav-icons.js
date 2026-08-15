(() => {
  const header = document.querySelector('header');
  if (!header) return;

  const nav = header.querySelector('nav');
  const menu = header.querySelector('.menu');
  const join = header.querySelector('.join-link');
  const files = { Season: 'nav-season.png', Matches: 'nav-matches.png', Teams: 'nav-teams.png', Stats: 'nav-stats.png' };
  const current = location.pathname.split('/').pop() || 'index.html';
  const activePage = ['standings.html', 'bracket.html'].includes(current) ? 'matches.html' : current;

  header.classList.add('site-header');
  header.querySelectorAll('nav a').forEach(link => {
    const label = link.textContent.trim();
    link.replaceChildren();
    const image = document.createElement('img');
    image.className = 'nav-raster-icon';
    image.src = `images/${files[label] || 'nav-menu.png'}`;
    image.alt = '';
    image.width = 20;
    image.height = 20;
    const text = document.createElement('span');
    text.textContent = label;
    link.append(image, text);
    link.classList.toggle('active', (link.getAttribute('href') || '').split('#')[0] === activePage);
    if (link.classList.contains('active')) link.setAttribute('aria-current', 'page');
  });

  if (join) {
    join.href = 'https://discord.gg/mpcs';
    join.target = '_blank';
    join.rel = 'noopener';
    join.replaceChildren();
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    image.classList.add('nav-raster-icon', 'nav-discord-icon');
    image.setAttribute('viewBox', '0 0 24 24');
    image.setAttribute('aria-hidden', 'true');
    image.style.color = 'var(--cyan)';
    image.style.width = '21px';
    image.style.height = '21px';
    image.innerHTML = '<path fill="currentColor" d="M19.54 5.34A17.4 17.4 0 0 0 15.22 4l-.53 1.09a16.1 16.1 0 0 0-5.38 0L8.78 4a17.4 17.4 0 0 0-4.32 1.34C1.73 9.4.99 13.36 1.36 17.26a17.7 17.7 0 0 0 5.3 2.67l1.29-1.76a11.3 11.3 0 0 1-2.03-.97l.5-.39c3.92 1.82 8.17 1.82 12.04 0l.51.39c-.65.39-1.33.71-2.04.97l1.29 1.76a17.7 17.7 0 0 0 5.3-2.67c.44-4.52-.75-8.44-3.98-11.92ZM8.52 14.86c-1.18 0-2.15-1.09-2.15-2.43S7.32 10 8.52 10s2.17 1.1 2.15 2.43c0 1.34-.95 2.43-2.15 2.43Zm6.96 0c-1.18 0-2.15-1.09-2.15-2.43S14.28 10 15.48 10s2.17 1.1 2.15 2.43c0 1.34-.95 2.43-2.15 2.43Z"/>';
    const text = document.createElement('span');
    text.textContent = 'Join Discord';
    const arrow = document.createElement('b');
    arrow.textContent = '↗';
    join.append(image, text, arrow);
    const mobileJoin = join.cloneNode(true);
    mobileJoin.classList.add('mobile-discord-link');
    nav?.append(mobileJoin);
  }

  header.querySelectorAll('.logo img,.footer-brand img').forEach(image => image.src = 'images/mpcs-icon-simple.png');
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.href = 'images/mpcs-icon-simple.png';
  document.querySelectorAll('a[href="admin.html"],.footer-admin').forEach(link => link.remove());

  if (!menu || !nav) return;
  menu.type = 'button';
  menu.setAttribute('aria-label', 'Open navigation');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-controls', 'site-navigation');
  nav.id = 'site-navigation';
  menu.replaceChildren();
  for (let index = 0; index < 3; index++) menu.append(document.createElement('span'));

  const setOpen = open => {
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menu.onclick = event => { event.stopPropagation(); setOpen(!nav.classList.contains('open')); };
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { setOpen(false); menu.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 800) setOpen(false); }, { passive: true });
})();
