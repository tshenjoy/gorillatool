# StarlandMech - Static Website

A static HTML/CSS/JS implementation of the StarlandMech website, designed for easy maintenance and customization.

## Project Structure

```
starlandmech/
├── index.html              # Homepage
├── assets/
│   ├── css/
│   │   ├── styles.css      # Main stylesheet (global styles)
│   │   └── pages.css       # Page-specific styles
│   ├── js/
│   │   └── main.js         # Main JavaScript file
│   ├── images/             # All website images
│   ├── videos/             # Video files (banner video)
│   └── fonts/              # Custom fonts (if needed)
├── pages/
│   ├── about.html          # About Us page
│   ├── contact.html        # Contact page with form
│   ├── products.html       # Products catalog
│   └── services.html       # Services page
├── data/                   # Data files for future use (JSON configs, etc.)
└── README.md               # This documentation
```

---

## Quick Start

1. **Open locally**: Simply open `index.html` in a web browser
2. **Deploy to server**: Upload the entire `starlandmech/` folder to your web hosting

---

## Maintenance Guide

### Adding New Products

Products are displayed on both the homepage (flip cards) and the Products page.

#### On Homepage (`index.html`)

Find the `products-showcase` section and add a new product card:

```html
<div class="product-card flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <img src="assets/images/YOUR_IMAGE.jpg" alt="Product Name">
        </div>
        <div class="flip-card-back">
            <h3>Product Name</h3>
            <a href="#" class="btn btn-outline" onclick="openQuoteModal()">Get Full specification</a>
        </div>
    </div>
</div>
```

#### On Products Page (`pages/products.html`)

Find the appropriate category section and add:

```html
<div class="product-card-page">
    <div class="product-image">
        <img src="../assets/images/YOUR_IMAGE.jpg" alt="Product Name">
    </div>
    <div class="product-info">
        <h4>Product Name</h4>
        <p>Product description goes here.</p>
        <button class="btn btn-primary" onclick="openQuoteModal()">Request Quote</button>
    </div>
</div>
```

### Adding New Product Categories

1. Open `pages/products.html`
2. Add a new category section:

```html
<div id="new-category" class="product-category">
    <div class="category-header">
        <h2>New Category Name</h2>
        <p>Category description.</p>
    </div>
    <div class="products-grid-page">
        <!-- Add product cards here -->
    </div>
</div>
```

3. Update the navigation menu in all HTML files to include the new category link

---

### Adding New Images

1. Place new images in `assets/images/`
2. Reference them in HTML:
   - From `index.html`: `src="assets/images/filename.jpg"`
   - From `pages/*.html`: `src="../assets/images/filename.jpg"`

**Recommended image formats:**
- Photos: JPG (for smaller file sizes)
- Graphics/logos with transparency: PNG
- Icons: SVG or use Font Awesome

---

### Modifying Styles

#### Color Scheme

Edit CSS variables at the top of `assets/css/styles.css`:

```css
:root {
    /* Primary Colors */
    --primary-color: #046BD2;       /* Main brand color */
    --primary-dark: #045CB4;        /* Darker shade for hover */
    --primary-light: #0A8AE6;       /* Lighter shade */

    /* Text Colors */
    --text-primary: #334155;        /* Body text */
    --text-heading: #1E293B;        /* Headings */

    /* Background Colors */
    --bg-light: #F0F5FA;            /* Light sections */
    --bg-dark: #1E293B;             /* Dark sections (footer) */
}
```

#### Fonts

Change the font family in `styles.css`:

```css
:root {
    --font-family: 'Your Font', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

Remember to update the Google Fonts link in the HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### Enabling Contact Form Email

The contact form uses Formspree for email delivery. To enable:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in the form action URLs:

**In `index.html` (quote modal):**
```html
<form id="quoteForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**In `pages/contact.html`:**
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**In `pages/products.html`:**
```html
<form id="quoteForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. Remove the `e.preventDefault()` line from the form submit handlers in the JavaScript to allow actual form submission.

**Alternative email services:**
- [Netlify Forms](https://www.netlify.com/products/forms/) (if hosting on Netlify)
- [EmailJS](https://www.emailjs.com/) (for client-side email)

---

### Updating Team Members

Edit `pages/about.html` and find the team section:

```html
<div class="team-card">
    <div class="team-image">
        <img src="../assets/images/team-member.jpg" alt="Name">
    </div>
    <div class="team-info">
        <h4>Name</h4>
        <p>Job Title</p>
    </div>
</div>
```

---

### Updating Social Media Links

Social links appear in multiple locations:

1. **Footer** (all pages) - in `.social-icons` div
2. **Contact page** - in `.social-connect` div

Find and update these links:

```html
<a href="https://www.facebook.com/YOUR_PAGE" target="_blank">
    <i class="fab fa-facebook-f"></i>
</a>
```

---

### Adding New Pages

1. Copy an existing page (e.g., `pages/services.html`) as a template
2. Update the page content
3. Update the navigation menu in ALL HTML files:
   - `index.html`
   - All files in `pages/`

**Navigation menu structure:**

```html
<li class="nav-item"><a href="new-page.html">New Page</a></li>
```

For dropdown items:

```html
<li class="nav-item has-dropdown">
    <a href="#">Parent</a>
    <ul class="dropdown">
        <li><a href="child-page.html">Child Page</a></li>
    </ul>
</li>
```

---

## Customization Tips

### Changing the Logo

Replace `assets/images/131748081632_.pic_hd.png` with your logo, or update the `<img>` src in:
- Header section of all HTML files
- Footer section of all HTML files

### Changing the Hero Video

Replace `assets/videos/compressed_banner_vid.mp4` or update:

```html
<video autoplay muted loop playsinline class="hero-video">
    <source src="assets/videos/your-video.mp4" type="video/mp4">
</video>
```

**Tip:** Keep videos under 5MB for faster loading. Use tools like HandBrake for compression.

---

## Deployment

### Simple Hosting

Upload the `starlandmech/` folder to any web host:
- Shared hosting (cPanel, Plesk)
- Static hosting (Netlify, Vercel, GitHub Pages)
- Cloud storage (AWS S3, Google Cloud Storage)

### GitHub Pages

1. Create a GitHub repository
2. Push the `starlandmech/` folder contents
3. Enable GitHub Pages in repository settings
4. Your site will be available at `https://yourusername.github.io/reponame/`

### Netlify

1. Create a Netlify account
2. Connect your GitHub repository
3. Set the publish directory to `starlandmech/`
4. Deploy!

---

## Browser Support

This website works in all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

---

## Credits

- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Carousel**: [Swiper.js](https://swiperjs.com/)
- **Fonts**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

## File Size Summary

| Directory | Size | Description |
|-----------|------|-------------|
| images/ | ~9 MB | All website images |
| videos/ | ~4 MB | Banner video |
| css/ | ~20 KB | Stylesheets |
| js/ | ~8 KB | JavaScript |
| HTML files | ~50 KB | All pages |

**Total project size: ~13 MB**

---

## Support

For questions or issues with this website, please contact the original developer or refer to this documentation.
