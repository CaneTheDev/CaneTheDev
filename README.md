# Cane The Dev - Interactive Portfolio

A lightweight, interactive notepad-style portfolio website with simple page navigation. Built with vanilla JavaScript and optimized for performance across all devices.

## Features

- **Simple Page Navigation**: Clean fade transitions between pages
- **Multiple Input Methods**: Keyboard arrows, touch swipes, screen taps, and navigation buttons
- **Notepad Aesthetic**: Authentic lined paper design with margin lines and stacked page effects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Lightweight**: No heavy 3D transforms or complex animations - fast loading on all devices
- **Touch-Optimized**: Smooth scrolling and navigation on mobile devices

## Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Simple transitions and responsive design
- **Vanilla JavaScript**: Pure ES6+ with minimal code
- **No Dependencies**: Zero external libraries or frameworks

## Project Structure

```
├── index.html              # Main HTML structure with 6 portfolio pages
├── style.css               # Complete styling with responsive design
├── script.js               # Date display utility
├── page-flip-physics.js    # Simple page navigation logic
├── Cane-image.webp         # Profile image
├── table.webp              # Background texture
└── html.txt                # Plain text content reference
```

## Pages Overview

1. **Cover Page**: Introduction with profile image
2. **What I Do**: Skills and expertise overview
3. **Selected Systems**: Featured projects with GitHub links
4. **Tech Stack**: Comprehensive list of technologies and tools
5. **Work Philosophy**: Principles and approach
6. **Contact**: Social links and contact information

## Key Technical Highlights

### Lightweight Design
- Simple CSS fade transitions (0.3s)
- No heavy 3D transforms or physics calculations
- Optimized for low-end devices and slow connections
- Minimal JavaScript footprint

### Vertical Rhythm System
- Consistent line height across all content (32px desktop, 28px tablet, 26px mobile)
- Aligned with background ruled lines
- Maintains readability and visual harmony

### Mobile-First Approach
- Touch-friendly navigation
- Responsive font sizes and spacing
- Smooth scrolling on iOS and Android
- Optimized padding and margins for small screens

## Navigation Controls

- **Keyboard**: Arrow keys (←/→ or ↑/↓)
- **Touch**: Swipe left/right or up/down
- **Mouse**: Click left/right half of screen
- **Buttons**: Navigation arrows (hidden on mobile)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Works on low-end devices

## Performance Optimizations

- Simple CSS transitions instead of complex animations
- No requestAnimationFrame loops
- Minimal DOM manipulation
- Efficient event delegation
- Optimized image formats (WebP)
- No external dependencies

## Customization

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
    --ink: rgb(44, 62, 80);
    --paper-color: rgb(254, 249, 199);
    --line-color: #949494;
}
```

### Adjusting Transition Speed
Modify transition in `style.css`:
```css
.page {
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
```

### Adding Pages
1. Add new `<section class="page">` in `index.html`
2. Update page numbers
3. Maintain consistent page structure

## Local Development

Simply open `index.html` in a modern web browser. No build process or dependencies required.

For local server (optional):
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

## License

Personal portfolio project. Feel free to use as inspiration, but please don't copy directly.

## Contact

- **Email**: canethedev@gmail.com
- **GitHub**: [@CaneTheDev](https://github.com/CaneTheDev)
- **LinkedIn**: [super-man-994963329](https://www.linkedin.com/in/super-man-994963329)
- **X/Twitter**: [@CaneDevMax](https://x.com/CaneDevMax)

---

Built for speed, simplicity, and accessibility.
