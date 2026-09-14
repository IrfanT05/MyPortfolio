// Enhance the always-available navigation with a collapsible mobile menu.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');
const mobileViewport = window.matchMedia('(max-width: 950px)');

function closeMenu(returnFocus = false) {
  navigation.classList.add('menu-collapsed');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}

function syncMenu() {
  const focusWasInMenu = navigation.contains(document.activeElement);
  menuButton.hidden = !mobileViewport.matches;
  if (mobileViewport.matches) {
    closeMenu(focusWasInMenu);
  } else {
    navigation.classList.remove('menu-collapsed');
    menuButton.setAttribute('aria-expanded', 'false');
  }
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  navigation.classList.toggle('menu-collapsed', isOpen);
  menuButton.setAttribute('aria-expanded', String(!isOpen));
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobileViewport.matches) return;
  closeMenu();
  // Put keyboard focus at the destination rather than in the hidden menu.
  const destination = document.querySelector(link.getAttribute('href'));
  if (destination) {
    destination.setAttribute('tabindex', '-1');
    destination.focus({ preventScroll: true });
    destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileViewport.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

document.addEventListener('click', (event) => {
  if (mobileViewport.matches && !event.target.closest('.nav')) closeMenu();
});

mobileViewport.addEventListener('change', syncMenu);
syncMenu();
document.querySelector('#year').textContent = new Date().getFullYear();
