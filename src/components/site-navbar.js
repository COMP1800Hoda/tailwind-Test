// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '/src/firebaseConfig.js';
import { logoutUser } from '/src/authentication.js';

class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.renderNavbar();
    this.setupMobileMenu();
    this.renderAuthControls();
  }

  renderNavbar() {
    this.innerHTML = `
      <!-- Navbar: single source of truth -->
      <nav class="bg-cyan-500 text-white shadow-sm">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between gap-3">
            <!-- Brand -->
            <a href="/" class="flex items-center gap-2 font-semibold tracking-tight">
              <img src="/images/image.jpg" alt="Logo" class="h-9 w-9 rounded object-cover" />
              <span>ElmoHikes</span>
            </a>

            <!-- Desktop nav -->
            <div class="hidden md:flex md:items-center md:gap-6">
              <ul class="flex items-center gap-4">
                <li>
                  <a href="/" class="rounded px-2 py-1 text-sm font-medium hover:bg-white/15">
                    Home
                  </a>
                </li>
              </ul>

              <form class="flex items-center gap-2" id="navSearch" role="search">
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  class="w-44 rounded-md border border-white/30 bg-white/95 px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
                <button
                  type="submit"
                  class="rounded-md border border-white/70 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
                >
                  Search
                </button>
              </form>

              <div id="authControls" class="flex items-center gap-2">
                <!-- populated by JS -->
              </div>
            </div>

            <!-- Mobile toggle -->
            <button
              id="mobileMenuBtn"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded="false"
              class="inline-flex items-center justify-center rounded-md p-2 hover:bg-white/15 md:hidden"
            >
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div id="mobileMenu" class="hidden border-t border-white/20 md:hidden">
          <div class="space-y-3 px-4 py-4">
            <a href="/" class="block rounded px-2 py-2 text-sm font-medium hover:bg-white/15">
              Home
            </a>

            <form class="flex items-center gap-2" id="navSearchMobile" role="search">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                class="min-w-0 flex-1 rounded-md border border-white/30 bg-white/95 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
              <button
                type="submit"
                class="rounded-md border border-white/70 px-3 py-2 text-sm font-medium hover:bg-white/10"
              >
                Search
              </button>
            </form>

            <div id="authControlsMobile" class="flex items-center gap-2">
              <!-- populated by JS -->
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  setupMobileMenu() {
    const btn = this.querySelector('#mobileMenuBtn');
    const menu = this.querySelector('#mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(isHidden));
    });
  }

  renderAuthControls() {
    const authControls = this.querySelector('#authControls');
    const authControlsMobile = this.querySelector('#authControlsMobile');

    const placeholder = `
      <div class="rounded-md border border-white/60 px-3 py-1.5 text-sm font-medium invisible" style="min-width: 80px;">
        Log out
      </div>
    `;

    if (authControls) authControls.innerHTML = placeholder;
    if (authControlsMobile) authControlsMobile.innerHTML = placeholder;

    onAuthStateChanged(auth, (user) => {
      let desktopHTML = '';
      let mobileHTML = '';

      if (user) {
        desktopHTML = `
          <button
            class="rounded-md border border-white/70 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
            id="signOutBtn"
            type="button"
            style="min-width: 80px;"
          >
            Log out
          </button>
        `;
        mobileHTML = `
          <button
            class="rounded-md border border-white/70 px-3 py-2 text-sm font-medium hover:bg-white/10"
            id="signOutBtnMobile"
            type="button"
            style="min-width: 80px;"
          >
            Log out
          </button>
        `;
      } else {
        desktopHTML = `
          <a
            class="rounded-md border border-white/70 px-3 py-1.5 text-sm font-medium hover:bg-white/10 text-center"
            id="loginBtn"
            href="/login.html"
            style="min-width: 80px;"
          >
            Log in
          </a>
        `;
        mobileHTML = `
          <a
            class="rounded-md border border-white/70 px-3 py-2 text-sm font-medium hover:bg-white/10 text-center"
            id="loginBtnMobile"
            href="/login.html"
            style="min-width: 80px;"
          >
            Log in
          </a>
        `;
      }

      if (authControls) authControls.innerHTML = desktopHTML;
      if (authControlsMobile) authControlsMobile.innerHTML = mobileHTML;

      const signOutBtn = this.querySelector('#signOutBtn');
      const signOutBtnMobile = this.querySelector('#signOutBtnMobile');

      signOutBtn?.addEventListener('click', logoutUser);
      signOutBtnMobile?.addEventListener('click', logoutUser);
    });
  }
}

customElements.define('site-navbar', SiteNavbar);