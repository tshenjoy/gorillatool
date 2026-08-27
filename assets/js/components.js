/**
 * StarlandMech - Shared Components
 * Renders header navigation and footer from a single source.
 * Usage: Include this script, then call renderHeader('pageName') and renderFooter().
 */

(function () {
    // Detect path depth: root vs pages/ subdirectory
    function getBasePath() {
        var path = window.location.pathname;
        if (path.indexOf('/pages/') !== -1) {
            return '../';
        }
        return '';
    }

    function getPagesPath() {
        var path = window.location.pathname;
        if (path.indexOf('/pages/') !== -1) {
            return '';
        }
        return 'pages/';
    }

    /**
     * Render the site header/navigation.
     * @param {string} activePage - one of: 'home', 'service', 'technical-help',
     *   'research-development', 'after-sale-service', 'technical-article',
     *   'products', 'parts-consumables', 'product-news', 'contact', 'about'
     */
    window.renderHeader = function (activePage) {
        var base = getBasePath();
        var pg = getPagesPath();

        // Helper: returns ' active' class if current page matches
        function ac(name) {
            return activePage === name ? ' active' : '';
        }
        // Service sub-pages should also highlight Service parent
        var servicePages = ['service', 'technical-help', 'research-development', 'after-sale-service', 'technical-article'];
        var isServiceActive = servicePages.indexOf(activePage) !== -1;

        var html = '' +
            '<header class="site-header">' +
            '  <div class="header-container">' +
            '    <div class="logo">' +
            '      <a href="' + base + 'index.html">' +
            '        <img src="' + base + 'assets/images/logo-footer.png" alt="StarlandMech Logo">' +
            '      </a>' +
            '    </div>' +
            '    <nav class="main-nav">' +
            '      <ul class="nav-menu">' +
            '        <li class="nav-item' + ac('home') + '"><a href="' + base + 'index.html">Home</a></li>' +
            '        <li class="nav-item has-dropdown' + (isServiceActive ? ' active' : '') + '">' +
            '          <a href="' + pg + 'services.html">Service</a>' +
            '          <ul class="dropdown">' +
            '            <li><a href="' + pg + 'technical-help.html">Technical Help</a></li>' +
            '            <li><a href="' + pg + 'research-development.html">Research & Development</a></li>' +
            '            <li><a href="' + pg + 'after-sale-service.html">After-sale Service</a></li>' +
            '            <li><a href="' + pg + 'technical-article.html">Technical Article</a></li>' +
            '          </ul>' +
            '        </li>' +
            '        <li class="nav-item has-dropdown' + ac('products') + '">' +
            '          <a href="' + pg + 'products.html">Products</a>' +
            '          <ul class="dropdown">' +
            '            <li><a href="' + pg + 'diamond-core-drill.html">Drill Machines</a></li>' +
            '            <li><a href="' + pg + 'drill-stand.html">Drill Stands</a></li>' +
            '            <li><a href="' + pg + 'floor-grinder.html">Floor Grinders</a></li>' +
            '            <li><a href="' + pg + 'products.html#water-drill-dust-collector">Water Drills & Dust Collectors</a></li>' +
            '            <li><a href="' + pg + 'products.html#product-bundles">Product Bundles</a></li>' +
            '          </ul>' +
            '        </li>' +
            '        <li class="nav-item has-dropdown' + ac('parts-consumables') + '">' +
            '          <a href="' + pg + 'parts-consumables.html">Parts & Consumables</a>' +
            '          <ul class="dropdown">' +
            '            <li><a href="' + pg + 'parts-consumables.html#drill-accessories">Drill Accessories</a></li>' +
            '            <li><a href="' + pg + 'parts-consumables.html#stand-accessories">Stand Accessories</a></li>' +
            '            <li><a href="' + pg + 'parts-consumables.html#floor-grinder-accessories">Floor Grinder Accessories</a></li>' +
            '            <li><a href="' + pg + 'parts-consumables.html#drill-bits">Drill Bits</a></li>' +
            '            <li><a href="' + pg + 'parts-consumables.html#abrasives">Abrasives</a></li>' +
            '          </ul>' +
            '        </li>' +
            '        <li class="nav-item has-dropdown' + ac('product-news') + '">' +
            '          <a href="' + pg + 'product-news.html">Product News</a>' +
            '          <ul class="dropdown">' +
            '            <li><a href="' + pg + 'product-news.html#new-arrivals">New Arrivals</a></li>' +
            '            <li><a href="' + pg + 'product-news.html#promotions">Promotions</a></li>' +
            '          </ul>' +
            '        </li>' +
            '        <li class="nav-item' + ac('contact') + '"><a href="' + pg + 'contact.html">Contact Us</a></li>' +
            '        <li class="nav-item' + ac('about') + '"><a href="' + pg + 'about.html">About Us</a></li>' +
            '      </ul>' +
            '    </nav>' +
            '    <div class="header-actions">' +
            '      <button class="search-toggle" aria-label="Search">' +
            '        <i class="fas fa-search"></i>' +
            '      </button>' +
            '    </div>' +
            '    <button class="mobile-menu-toggle" aria-label="Toggle Menu">' +
            '      <i class="fas fa-bars"></i>' +
            '    </button>' +
            '  </div>' +
            '</header>';

        var target = document.getElementById('site-header');
        if (target) {
            target.outerHTML = html;
        }
    };

    /**
     * Render the site footer.
     */
    window.renderFooter = function () {
        var base = getBasePath();
        var pg = getPagesPath();

        var html = '' +
            '<footer class="site-footer">' +
            '  <div class="footer-container">' +
            '    <div class="footer-column footer-brand">' +
            '      <img src="' + base + 'assets/images/logo-footer.png" alt="StarlandMech" class="footer-logo">' +
            '      <p class="footer-tagline">Professional construction machinery solutions built for performance, reliability, and durability on every job site.</p>' +
            '      <div class="social-icons">' +
            '        <a href="https://wa.me/message/7Y2LBZ2Z2SI3B1" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>' +
            '        <a href="https://facebook.com/share/1Bc6PDuMKT" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>' +
            '        <a href="https://instagram.com/starlandmech?igsh=MW9mcGN4Z212NzhwbQ==" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>' +
            '        <a href="https://t.me/StarlandMech" target="_blank" aria-label="Telegram"><i class="fab fa-telegram"></i></a>' +
            '        <a href="https://youtube.com/@starlandmech" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>' +
            '        <a href="https://tiktok.com/@starland_mech.gar" target="_blank" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>' +
            '        <a href="https://vk.com/mr.garvin" target="_blank" aria-label="VK"><i class="fab fa-vk"></i></a>' +
            '      </div>' +
            '    </div>' +
            '    <div class="footer-column">' +
            '      <h5>Service</h5>' +
            '      <ul class="footer-links">' +
            '        <li><a href="' + pg + 'technical-help.html">Technical Help</a></li>' +
            '        <li><a href="' + pg + 'research-development.html">Research & Development</a></li>' +
            '        <li><a href="' + pg + 'after-sale-service.html">After-sale Service</a></li>' +
            '        <li><a href="' + pg + 'technical-article.html">Technical Article</a></li>' +
            '      </ul>' +
            '    </div>' +
            '    <div class="footer-column">' +
            '      <h5>Support</h5>' +
            '      <ul class="footer-links">' +
            '        <li><a href="' + pg + 'contact.html">Contact</a></li>' +
            '        <li><a href="' + pg + 'about.html">About Us</a></li>' +
            '      </ul>' +
            '    </div>' +
            '    <div class="footer-column">' +
            '      <h5>Recent Post</h5>' +
            '      <div class="recent-posts">' +
            '        <article class="recent-post">' +
            '          <a href="#">Coming Soon</a>' +
            '          <span class="post-date">Stay tuned for updates</span>' +
            '        </article>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '  <div class="footer-bottom">' +
            '    <ul class="footer-bottom-links">' +
            '      <li><a href="#">Term & Service</a></li>' +
            '      <li><a href="#">Privacy Policy</a></li>' +
            '      <li><a href="#">Cookie Policy</a></li>' +
            '    </ul>' +
            '    <p class="copyright">Copyright &copy; 2025 StarlandMech, All rights reserved</p>' +
            '  </div>' +
            '</footer>';

        var target = document.getElementById('site-footer');
        if (target) {
            target.outerHTML = html;
        }
    };
})();
