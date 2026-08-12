(()=>{
  const files={Season:'nav-season.png',Matches:'nav-matches.png',Teams:'nav-teams.png',Stats:'nav-stats.png'};
  document.querySelectorAll('header nav a').forEach(a=>{
    const label=a.textContent.trim();
    a.innerHTML=`<img class="nav-raster-icon" src="images/${files[label]||'nav-menu.png'}" alt=""><span>${label}</span>`;
  });
  document.querySelectorAll('.join-link').forEach(a=>a.innerHTML='<img class="nav-raster-icon" src="images/nav-discord.png" alt=""><span>Join Discord</span><b>↗</b>');
  document.querySelectorAll('header .logo img,.footer-brand img').forEach(img=>img.src='images/mpcs-icon-simple.png');
  const favicon=document.querySelector('link[rel="icon"]');
  if(favicon)favicon.href='images/mpcs-icon-simple.png';
  const menu=document.querySelector('.menu');
  if(menu)menu.innerHTML='<img class="nav-raster-icon" src="images/nav-menu.png" alt="">';
})();
