// Tawk.to Configuration
var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();

// Custom settings
Tawk_API.onLoad = function(){
    // Track chat widget load
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chat_widget_loaded', {
            'event_category': 'engagement'
        });
    }
};

Tawk_API.onChatStarted = function(){
    // Track when user starts a chat
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chat_started', {
            'event_category': 'engagement'
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact', {
            'content_name': 'Live Chat'
        });
    }
};

Tawk_API.onChatEnded = function(){
    // Track when chat ends
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chat_ended', {
            'event_category': 'engagement'
        });
    }
};

// Load Tawk.to script
(function(){
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6856cb76ad02b0190ecad15d/1iu9gli29';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
})();