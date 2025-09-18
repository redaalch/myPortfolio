const header = document.querySelector('header');
document.addEventListener('click', function (e) {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href) return;
  if (href.charAt(0) !== '#') return;