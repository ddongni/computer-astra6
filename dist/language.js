// Keep the selected lab and anchor when moving between static language versions.
// No browser-language redirect: the root URL always opens in English.
const root = new URL('./', import.meta.url);
function updateLanguageLinks() {
  for (const link of document.querySelectorAll('[data-locale]')) {
    const url = new URL(link.dataset.locale === 'ko' ? 'ko/' : './', root);
    url.search = location.search;
    url.hash = location.hash;
    link.href = url.href;
  }
}
updateLanguageLinks();
document.addEventListener('coursechange', updateLanguageLinks);
window.addEventListener('hashchange', updateLanguageLinks);
window.addEventListener('popstate', updateLanguageLinks);
document.querySelector('.language-switch')?.addEventListener('click', event => {
  updateLanguageLinks();
  if (event.target.closest('[aria-current="page"]')) event.preventDefault();
});
