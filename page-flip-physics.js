// Simple Page Navigation - Lightweight version
(function() {
    'use strict';
    
    const pages = document.querySelectorAll('.page');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    
    let currentPage = 0;
    const totalPages = pages.length;
    
    function updatePageStates() {
        pages.forEach((page, index) => {
            page.classList.remove('active', 'flipped', 'next', 'hidden');
            
            if (index < currentPage) {
                page.classList.add('flipped');
                page.style.zIndex = index;
            } else if (index === currentPage) {
                page.classList.add('active');
                page.style.zIndex = 100;
            } else if (index === currentPage + 1) {
                page.classList.add('next');
                page.style.zIndex = 99;
            } else {
                page.classList.add('hidden');
                page.style.zIndex = index;
            }
        });
        
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
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevPage();
            } else {
                nextPage();
            }
        } else if (Math.abs(deltaY) > 50) {
            if (deltaY < 0) {
                nextPage();
            } else {
                prevPage();
            }
        }
    }, { passive: true });
    
    // Click navigation
    document.addEventListener('click', (e) => {
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
    
    // Set current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
})();
