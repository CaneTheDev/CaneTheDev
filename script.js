// Simple notepad navigation - no heavy animations
(function() {
    'use strict';
    
    // Set current date on first page
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
})();
