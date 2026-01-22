// Realistic Page Flip Physics Engine
// Simulates actual paper turning with proper 3D transforms and physics

(function() {
    'use strict';
    
    const pages = document.querySelectorAll('.page');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    
    let currentPage = 0;
    const totalPages = pages.length;
    let isFlipping = false;
    
    // Physics constants for snappy, realistic page turning
    const FLIP_DURATION = 600; // milliseconds - faster and snappier
    const FLIP_EASING = 'cubic-bezier(0.25, 0.1, 0.25, 1)'; // Snappier easing
    
    /**
     * Apply realistic 3D page flip transformation with curl/bend
     * @param {HTMLElement} page - The page element to transform
     * @param {number} progress - Flip progress from 0 to 1
     * @param {boolean} isForward - Direction of flip
     */
    function applyPageFlipTransform(page, progress, isForward) {
        // For backward, we reverse the animation (1 -> 0 becomes 0 -> 1)
        const animProgress = isForward ? progress : (1 - progress);
        
        // Angle: forward goes 0 -> -180, backward goes -180 -> 0
        const angle = isForward ? -180 * progress : -180 + (180 * progress);
        
        // Curl is strongest at 30-70% of the flip
        const curlIntensity = Math.sin(animProgress * Math.PI) * 25;
        
        // Page bends more dramatically at the start of the flip
        const bendFactor = animProgress < 0.5 
            ? animProgress * 2  // Ramp up bend
            : (1 - animProgress) * 2; // Ramp down bend
        
        const bendAngle = bendFactor * 8; // Subtle X-axis rotation for curl
        
        // Slight lift as page turns (paper doesn't stay flat)
        const lift = Math.sin(animProgress * Math.PI) * 8;
        
        // Add perspective skew for realistic page sliding effect
        const skewAmount = Math.sin(animProgress * Math.PI) * 3;
        
        // Shadow intensity - strongest at mid-flip
        const shadowOpacity = Math.sin(animProgress * Math.PI) * 0.4;
        const shadowBlur = 10 + (Math.sin(animProgress * Math.PI) * 20);
        
        // Apply 3D transforms with curl effect
        page.style.transform = `
            translateY(-${lift}px)
            translateZ(${lift * 2}px)
            rotateY(${angle}deg)
            rotateX(${bendAngle}deg)
            skewY(${skewAmount * 0.5}deg)
        `;
        
        // Dynamic shadow for depth and realism
        page.style.boxShadow = `
            ${-curlIntensity * 0.5}px ${lift}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}),
            0 2px 8px rgba(0, 0, 0, 0.15)
        `;
        
        // Keep page fully opaque - NO blur effect
        page.style.opacity = 1;
    }
    
    /**
     * Animate page flip with realistic physics
     * @param {HTMLElement} page - Page to flip
     * @param {boolean} isForward - Flip direction
     * @returns {Promise} - Resolves when animation completes
     */
    function animatePageFlip(page, isForward) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            let lastTime = startTime;
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / FLIP_DURATION, 1);
                
                // Apply easing function for natural motion
                const easedProgress = easeInOutCubic(progress);
                
                applyPageFlipTransform(page, easedProgress, isForward);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Reset transform after flip completes - IMMEDIATELY
                    page.style.transition = 'none';
                    if (isForward) {
                        page.style.transform = 'rotateY(-180deg)';
                        page.style.opacity = '0';
                        page.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    } else {
                        page.style.transform = 'rotateY(0deg)';
                        page.style.opacity = '1';
                        page.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }
                    resolve();
                }
            }
            
            // Start immediately - no delay
            requestAnimationFrame(animate);
        });
    }
    
    /**
     * Easing function for snappy, natural page turning
     * Starts fast, slows at the end (like real paper momentum)
     */
    function easeInOutCubic(t) {
        // Snappier easing - quick start, smooth finish
        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    
    /**
     * Update page states and z-indices
     */
    function updatePageStates() {
        pages.forEach((page, index) => {
            page.classList.remove('active', 'flipped', 'next', 'hidden');
            
            // Remove any lingering transitions
            page.style.transition = 'none';
            
            if (index < currentPage) {
                page.classList.add('flipped');
                page.style.zIndex = index;
                page.style.transform = 'rotateY(-180deg)';
                page.style.opacity = '0';
                page.style.visibility = 'hidden';
                page.style.pointerEvents = 'none';
                page.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            } else if (index === currentPage) {
                page.classList.add('active');
                page.style.zIndex = 100;
                page.style.transform = 'rotateY(0deg)';
                page.style.opacity = '1';
                page.style.visibility = 'visible';
                page.style.pointerEvents = 'auto';
                page.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            } else if (index === currentPage + 1) {
                page.classList.add('next');
                page.style.zIndex = 99;
                page.style.transform = 'rotateY(0deg)';
                page.style.opacity = '1';
                page.style.visibility = 'visible';
                page.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            } else {
                page.classList.add('hidden');
                page.style.zIndex = index;
                page.style.visibility = 'hidden';
            }
        });
        
        // Update navigation arrows
        if (leftArrow) {
            leftArrow.classList.toggle('disabled', currentPage === 0);
        }
        if (rightArrow) {
            rightArrow.classList.toggle('disabled', currentPage === totalPages - 1);
        }
    }
    
    /**
     * Flip to next page with physics
     */
    async function nextPage() {
        if (currentPage < totalPages - 1 && !isFlipping) {
            isFlipping = true;
            hideNavHint();
            
            const currentPageElement = pages[currentPage];
            
            // Set up the page for flipping - NO DELAY
            currentPageElement.style.zIndex = 101;
            currentPageElement.style.transformOrigin = 'left center';
            currentPageElement.style.transition = 'none';
            
            // Start animation immediately
            await animatePageFlip(currentPageElement, true);
            
            currentPage++;
            updatePageStates();
            
            isFlipping = false;
        }
    }
    
    /**
     * Flip to previous page with physics
     */
    async function prevPage() {
        if (currentPage > 0 && !isFlipping) {
            isFlipping = true;
            hideNavHint();
            
            // Get the previous page element BEFORE decrementing
            const previousPageElement = pages[currentPage - 1];
            
            // Set up the page for flipping back - NO DELAY
            previousPageElement.style.zIndex = 101;
            previousPageElement.style.transformOrigin = 'left center';
            previousPageElement.style.transition = 'none';
            previousPageElement.style.visibility = 'visible';
            previousPageElement.style.pointerEvents = 'auto';
            previousPageElement.style.transform = 'rotateY(-180deg)';
            
            // Decrement AFTER setup
            currentPage--;
            
            // Start animation immediately
            await animatePageFlip(previousPageElement, false);
            
            updatePageStates();
            
            isFlipping = false;
        }
    }
    
    /**
     * Hide navigation hint after first interaction
     */
    function hideNavHint() {
        const navHint = document.querySelector('.nav-hint');
        if (navHint && !navHint.classList.contains('hidden')) {
            navHint.classList.add('hidden');
        }
    }
    
    // Event Listeners
    
    // Arrow click navigation - instant response
    if (leftArrow) {
        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            prevPage();
        }, { passive: false });
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            nextPage();
        }, { passive: false });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            prevPage();
        }
    });
    
    // Touch swipe navigation with physics
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaTime = touchEndTime - touchStartTime;
        
        // Calculate swipe velocity for more responsive feel
        const velocity = Math.abs(deltaX) / deltaTime;
        
        // Horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevPage();
            } else {
                nextPage();
            }
        }
        // Vertical swipe
        else if (Math.abs(deltaY) > 50) {
            if (deltaY < 0) {
                nextPage();
            } else {
                prevPage();
            }
        }
    }, { passive: true });
    
    // Click navigation (left/right half of screen) - instant response
    document.addEventListener('click', (e) => {
        // Ignore clicks on arrows and links
        if (e.target.closest('.nav-arrow') || e.target.closest('a')) {
            return;
        }
        
        e.preventDefault();
        
        const clickX = e.clientX;
        const screenWidth = window.innerWidth;
        
        if (clickX < screenWidth / 2) {
            prevPage();
        } else {
            nextPage();
        }
    }, { passive: false });
    
    // Initialize page states
    updatePageStates();
    
    // Set current date on first page
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
    
    // Add CSS for smooth transforms
    const style = document.createElement('style');
    style.textContent = `
        .page {
            transform-style: preserve-3d;
            backface-visibility: hidden;
            will-change: transform, opacity;
        }
    `;
    document.head.appendChild(style);
    
})();
