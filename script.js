// Notepad page flip navigation
(function() {
    'use strict';
    
    const pages = document.querySelectorAll('.page');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    
    let currentPage = 0;
    const totalPages = pages.length;
    
    function updatePageStates() {
        pages.forEach((page, index) => {
            // Remove all state classes
            page.classList.remove('active', 'flipped', 'next', 'hidden');
            
            // Apply appropriate state
            if (index < currentPage) {
                // Pages before current - flipped away
                page.classList.add('flipped');
                page.style.zIndex = index;
            } else if (index === currentPage) {
                // Current page - visible
                page.classList.add('active');
                page.style.zIndex = 100;
                
                // Trigger graph animation on page 5 (index 4)
                if (index === 4) {
                    triggerGraphAnimation();
                }
            } else if (index === currentPage + 1) {
                // Next page - slightly visible behind
                page.classList.add('next');
                page.style.zIndex = 99;
            } else {
                // Future pages - hidden
                page.classList.add('hidden');
                page.style.zIndex = index;
            }
        });
        
        // Update arrow states
        if (leftArrow) {
            leftArrow.classList.toggle('disabled', currentPage === 0);
        }
        if (rightArrow) {
            rightArrow.classList.toggle('disabled', currentPage === totalPages - 1);
        }
    }
    
    function nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePageStates();
            hideNavHint();
        }
    }
    
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            updatePageStates();
            hideNavHint();
        }
    }
    
    // Hide navigation hint after first interaction
    function hideNavHint() {
        const navHint = document.querySelector('.nav-hint');
        if (navHint && !navHint.classList.contains('hidden')) {
            navHint.classList.add('hidden');
        }
    }
    
    // Arrow click navigation
    if (leftArrow) {
        leftArrow.addEventListener('click', prevPage);
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', nextPage);
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
    
    // Touch swipe navigation
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
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
    
    // Click navigation (left/right half of screen)
    document.addEventListener('click', (e) => {
        // Ignore clicks on arrows and links
        if (e.target.closest('.nav-arrow') || e.target.closest('a')) {
            return;
        }
        
        const clickX = e.clientX;
        const screenWidth = window.innerWidth;
        
        if (clickX < screenWidth / 2) {
            prevPage();
        } else {
            nextPage();
        }
    });
    
    // Initialize
    updatePageStates();
    
    // Set current date on first page
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
    
    // Hand-drawn Clock - Real Time
    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        
        // Calculate rotation angles (no seconds)
        const minuteAngle = minutes * 6 + (now.getSeconds() * 0.1); // Smooth minute hand movement
        const hourAngle = hours * 30 + minutes * 0.5; // 30 degrees per hour + smooth transition
        
        // Apply rotations to clock hands
        const hourHand = document.getElementById('hour-hand');
        const minuteHand = document.getElementById('minute-hand');
        
        if (hourHand) {
            hourHand.setAttribute('transform', `rotate(${hourAngle} 100 100)`);
        }
        if (minuteHand) {
            minuteHand.setAttribute('transform', `rotate(${minuteAngle} 100 100)`);
        }
    }
    
    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
    
    // Exponential Growth Graph Animation
    let graphAnimated = false;
    
    function triggerGraphAnimation() {
        // Only animate once
        if (graphAnimated) return;
        
        const curve = document.getElementById('growth-curve');
        const arrow = document.getElementById('curve-arrow');
        const note = document.querySelector('.graph-note');
        const counter = document.getElementById('growth-counter');
        
        if (curve && arrow && note && counter) {
            // Reset animation
            curve.classList.remove('animate');
            arrow.classList.remove('show');
            note.classList.remove('show');
            counter.classList.remove('show');
            
            // Trigger animation after a brief delay
            setTimeout(() => {
                curve.classList.add('animate');
                arrow.classList.add('show');
                note.classList.add('show');
                counter.classList.add('show');
                
                // Animate counter from 1x to 100x exponentially
                let startTime = Date.now();
                const duration = 7000; // 7 seconds to match curve animation
                
                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Exponential growth: 1 to 100
                    const value = Math.floor(1 + Math.pow(progress, 2) * 99);
                    counter.textContent = value + 'x';
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = '100x+';
                    }
                }
                
                updateCounter();
                graphAnimated = true;
            }, 100);
        }
    }
    
})();
