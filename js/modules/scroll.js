const header = document.querySelector('header');
document.addEventListener('click', function (e) {
  const link = e.target.closest('a');
  if (!link) return;