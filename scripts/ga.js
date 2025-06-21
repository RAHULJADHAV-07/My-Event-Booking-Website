// Google Analytics 4 Configuration
// Replace 'YOUR_GA_MEASUREMENT_ID_HERE' with your actual GA4 Measurement ID

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Initialize Google Analytics
gtag('js', new Date());
gtag('config', 'G-4LQ7LY8QDR', {
    // Replace with your actual GA4 Measurement ID (format: G-XXXXXXXXXX)
    page_title: document.title,
    page_location: window.location.href
});

// Custom event tracking functions
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track page views for SPA-like navigation
function trackPageView(page_title, page_location) {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-4LQ7LY8QDR', {
            page_title: page_title,
            page_location: page_location
        });
    }
}

// Track file downloads
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href) {
        const href = link.href.toLowerCase();
        if (href.includes('.pdf') || href.includes('.doc') || href.includes('.zip')) {
            trackEvent('file_download', {
                'file_name': link.href.split('/').pop(),
                'link_url': link.href
            });
        }
    }
});

// Track external links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.includes(window.location.hostname)) {
        trackEvent('click', {
            'link_url': link.href,
            'link_text': link.textContent || link.innerHTML,
            'event_category': 'outbound'
        });
    }
});

// Load Google Analytics script
(function() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4LQ7LY8QDR';
    document.head.appendChild(script);
})();