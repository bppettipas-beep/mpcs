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
    const image = document.createElement('img');
    image.className = 'nav-raster-icon';
    image.src = 'images/nav-discord.png';
    image.alt = '';
    image.width = 20;
    image.height = 20;
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
