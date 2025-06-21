document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Track newsletter signup
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'event_category': 'engagement',
                    'event_label': email
                });
            }
            
            // Track Facebook Pixel event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Subscribe', {
                    'content_name': 'Newsletter'
                });
            }
            
            // Simulate form submission
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.innerHTML = '<span class="spinner"></span>Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Booking form handling
    const bookingForm = document.getElementById('bookingForm');
    const eventItems = document.querySelectorAll('.event-item');
    const selectButtons = document.querySelectorAll('.select-event');
    
    if (bookingForm && eventItems.length > 0) {
        const events = {
            'tech-conference': { name: 'Tech Conference 2025', price: 299 },
            'marketing-workshop': { name: 'Digital Marketing Workshop', price: 149 },
            'startup-networking': { name: 'Startup Networking', price: 79 }
        };
        
        let selectedEvent = null;
        
        selectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const eventItem = this.closest('.event-item');
                const eventId = eventItem.dataset.event;
                
                // Remove previous selection
                eventItems.forEach(item => item.classList.remove('selected'));
                selectButtons.forEach(btn => btn.textContent = 'Select');
                
                // Mark as selected
                eventItem.classList.add('selected');
                this.textContent = 'Selected';
                selectedEvent = eventId;
                
                // Update form
                document.getElementById('selectedEvent').value = eventId;
                document.getElementById('selectedEventName').textContent = events[eventId].name;
                updateTotalPrice();
            });
        });
        
        // Update total price when tickets change
        document.getElementById('tickets').addEventListener('change', updateTotalPrice);
        
        function updateTotalPrice() {
            if (selectedEvent) {
                const tickets = parseInt(document.getElementById('tickets').value);
                const basePrice = events[selectedEvent].price;
                const total = basePrice * tickets;
                document.getElementById('totalPrice').textContent = `Total: ${total}`;
            }
        }
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!selectedEvent) {
                alert('Please select an event first.');
                return;
            }
            
            const formData = new FormData(this);
            const bookingData = Object.fromEntries(formData);
            
            // Track booking event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase', {
                    'transaction_id': 'booking_' + Date.now(),
                    'value': events[selectedEvent].price * parseInt(bookingData.tickets),
                    'currency': 'USD'
                });
            }
            
            // Track Facebook Pixel event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Purchase', {
                    'value': events[selectedEvent].price * parseInt(bookingData.tickets),
                    'currency': 'USD',
                    'content_name': events[selectedEvent].name
                });
            }
            
            // Simulate booking process
            const button = this.querySelector('.book-button');
            const originalText = button.textContent;
            button.innerHTML = '<span class="spinner"></span>Processing...';
            button.disabled = true;
            
            setTimeout(() => {
                alert('Booking successful! You will receive a confirmation email shortly.');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
                
                // Reset selection
                eventItems.forEach(item => item.classList.remove('selected'));
                selectButtons.forEach(btn => btn.textContent = 'Select');
                selectedEvent = null;
                document.getElementById('selectedEventName').textContent = 'Please select an event';
                document.getElementById('totalPrice').textContent = 'Total: $0';
            }, 2000);
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = Object.fromEntries(formData);
            
            // Track contact form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_submit', {
                    'event_category': 'engagement'
                });
            }
            
            // Track Facebook Pixel event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact');
            }
            
            // Simulate form submission
            const button = this.querySelector('.submit-button');
            const originalText = button.textContent;
            button.innerHTML = '<span class="spinner"></span>Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                this.insertBefore(successMessage, button);
                
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});