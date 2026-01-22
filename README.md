# Cane The Dev - Interactive Portfolio

An interactive notepad-style portfolio website featuring realistic page-flip physics and hand-drawn elements. Built with vanilla JavaScript, CSS3 3D transforms, and custom physics simulation.

## Features

- **Realistic Page Flip Physics**: Custom-built physics engine simulating actual paper turning with 3D transforms, curl effects, and momentum
- **Interactive Navigation**: Multiple input methods - keyboard arrows, touch swipes, screen taps, and navigation buttons
- **Hand-Drawn Elements**: Animated real-time clock and exponential growth graph with SVG illustrations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Notepad Aesthetic**: Authentic lined paper design with margin lines and stacked page effects
- **Smooth Animations**: 60fps animations using requestAnimationFrame for optimal performance

## Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Advanced 3D transforms, custom properties, and responsive design
- **Vanilla JavaScript**: No frameworks - pure ES6+ with modular architecture
- **SVG**: Hand-drawn illustrations and animated graphics

## Project Structure

```
├── index.html              # Main HTML structure with 6 portfolio pages
├── style.css               # Complete styling with 3D effects and animations
├── script.js               # Core navigation logic and UI interactions
├── page-flip-physics.js    # Custom physics engine for realistic page flips
├── Cane-image.webp         # Profile image
├── table.webp              # Background texture
└── html.txt                # Plain text content reference
```

## Pages Overview

1. **Cover Page**: Introduction with animated clock and profile image
2. **What I Do**: Skills and expertise overview
3. **Selected Systems**: Featured projects with GitHub links
4. **Tech Stack**: Comprehensive list of technologies and tools
5. **Work Philosophy**: Principles and approach with animated growth graph
6. **Contact**: Social links and contact information

## Key Technical Highlights

### Page Flip Physics Engine
- Custom easing functions for natural paper motion
- 3D rotation with curl and bend effects
- Dynamic shadows and depth perception
- Optimized with `will-change` and `transform-style: preserve-3d`

### Vertical Rhythm System
- Consistent 32px line height across all content
- Aligned with background ruled lines
- Maintains readability and visual harmony

### Interactive Elements
- Real-time clock with rotating hands
- Animated exponential growth graph (1x → 100x+)
- Smooth page transitions with physics-based motion

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

## Performance Optimizations

- Hardware-accelerated CSS transforms
- RequestAnimationFrame for smooth 60fps animations
- Efficient event delegation
- Minimal DOM manipulation
- Optimized image formats (WebP)

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

### Adjusting Flip Speed
Modify physics constants in `page-flip-physics.js`:
```javascript
const FLIP_DURATION = 600; // milliseconds
```

### Adding Pages
1. Add new `<section class="page">` in `index.html`
2. Update `totalPages` calculation (automatic)
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

Built with attention to detail, physics, and user experience.
