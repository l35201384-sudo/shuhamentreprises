// Form handling and validation for Shubham Enterprises website

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initQuoteForm();
    initNewsletterForm();
    initJobApplicationForm();
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(field)} is required`;
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !ShubhamEnterprises.validateEmail(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation
    if (fieldName === 'phone' && value && !ShubhamEnterprises.validatePhone(value)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Project details validation
    if (fieldName === 'project-details' && value && value.length < 10) {
        errorMessage = 'Please provide more detailed project information';
        isValid = false;
    }
    
    // Privacy policy validation
    if (fieldName === 'privacy' && !field.checked) {
        errorMessage = 'You must agree to the Privacy Policy and Terms of Service';
        isValid = false;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function getFieldLabel(field) {
    const label = field.closest('.form-group').querySelector('.form-label');
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.id = field.name + 'Error';
    
    const formGroup = field.closest('.form-group');
    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.remove();
    }
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const removeLoadingState = ShubhamEnterprises.addLoadingState(submitBtn);
    
    // Create FormData
    const formData = new FormData(form);
    
    // Submit to FormSubmit
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage();
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage();
    })
    .finally(() => {
        removeLoadingState();
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('formError');
    
    if (errorMessage) errorMessage.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('formError');
    
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'block';
    
    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Quote Form Handling (Services page)
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;
    
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateQuoteForm()) {
            submitQuoteForm();
        }
    });
    
    // Real-time validation
    const inputs = quoteForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateQuoteForm() {
    const form = document.getElementById('quoteForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function submitQuoteForm() {
    const form = document.getElementById('quoteForm');
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            ShubhamEnterprises.showNotification('Quote request submitted successfully! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        ShubhamEnterprises.showNotification('Error submitting quote request. Please try again or contact us directly.', 'error');
    });
}

// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                ShubhamEnterprises.showNotification('Please enter your email address', 'error');
                return;
            }
            
            if (!ShubhamEnterprises.validateEmail(email)) {
                ShubhamEnterprises.showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                ShubhamEnterprises.showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }, 2000);
        });
    });
}

// Job Application Form Handling
function initJobApplicationForm() {
    const jobForm = document.getElementById('jobApplicationForm');
    if (!jobForm) return;
    
    jobForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateJobApplicationForm()) {
            submitJobApplication();
        }
    });
}

function validateJobApplicationForm() {
    const form = document.getElementById('jobApplicationForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function submitJobApplication() {
    const form = document.getElementById('jobApplicationForm');
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            ShubhamEnterprises.showNotification('Application submitted successfully! We\'ll review your application and get back to you soon.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        ShubhamEnterprises.showNotification('Error submitting application. Please try again or contact us directly.', 'error');
    });
}

// WhatsApp Integration
function initWhatsAppIntegration() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (!whatsappBtn) return;
    
    whatsappBtn.addEventListener('click', function() {
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || '';
        const service = formData.get('service') || '';
        const budget = formData.get('budget') || '';
        const projectDetails = formData.get('project-details') || '';
        
        const message = `Hi Shubham Enterprises!

I'm interested in your services. Here are my details:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Budget: ${budget}

Project Details:
${projectDetails}

Please contact me to discuss further.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/919685315564?text=${encodedMessage}`, '_blank');
    });
}

// Initialize WhatsApp integration
document.addEventListener('DOMContentLoaded', initWhatsAppIntegration);

// Form field formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 10) {
        value = value.substring(0, 10);
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    input.value = value;
}

// Initialize phone formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Character counter for textareas
function initCharacterCounters() {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.fontSize = 'var(--font-size-sm)';
        counter.style.color = 'var(--medium-gray)';
        counter.style.textAlign = 'right';
        counter.style.marginTop = 'var(--spacing-xs)';
        
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.style.color = 'var(--danger)';
            } else {
                counter.style.color = 'var(--medium-gray)';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });
}

// Initialize character counters
document.addEventListener('DOMContentLoaded', initCharacterCounters);

// Form auto-save (localStorage)
function initFormAutoSave() {
    const forms = document.querySelectorAll('form[id]');
    
    forms.forEach(form => {
        const formId = form.id;
        
        // Load saved data
        const savedData = localStorage.getItem(`form_${formId}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && field.type !== 'file') {
                    field.value = data[key];
                }
            });
        }
        
        // Save data on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const formData = new FormData(form);
                const data = {};
                
                for (let [key, value] of formData.entries()) {
                    if (key !== 'resume') { // Don't save file inputs
                        data[key] = value;
                    }
                }
                
                localStorage.setItem(`form_${formId}`, JSON.stringify(data));
            });
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', function() {
            setTimeout(() => {
                localStorage.removeItem(`form_${formId}`);
            }, 1000);
        });
    });
}

// Initialize form auto-save
document.addEventListener('DOMContentLoaded', initFormAutoSave);
