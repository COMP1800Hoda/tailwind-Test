class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Footer: single source of truth -->
      <footer class="mt-10 border-t border-slate-200">
        <div class="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
          <p>&copy; 2026 BCIT COMP1800</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);