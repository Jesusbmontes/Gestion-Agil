// Función para el FAQ (abrir y cerrar preguntas)
function toggleFaq(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems || index < 0 || index >= faqItems.length) return;
    const currentItem = faqItems[index];
    const answer = currentItem.querySelector('.faq-answer');
    const chevron = currentItem.querySelector('.chevron');
    const questionBtn = currentItem.querySelector('.faq-question');

    faqItems.forEach((item, i) => {
        const otherAnswer = item.querySelector('.faq-answer');
        const otherChevron = item.querySelector('.chevron');
        const otherQuestion = item.querySelector('.faq-question');
        if (i !== index) {
            otherAnswer.classList.remove('open');
            otherChevron.classList.remove('rotate-180');
            if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        }
    });

    const isOpen = answer.classList.toggle('open');
    chevron.classList.toggle('rotate-180');
    if (questionBtn) questionBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Inicialización después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll para anclas internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Observador para animaciones
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.process-card, .benefit-card, .faq-item')
        .forEach(el => observer.observe(el));

    // Estado inicial aria-expanded en botones FAQ
    document.querySelectorAll('.faq-item .faq-question').forEach(btn => btn.setAttribute('aria-expanded', 'false'));

    // Sticky header: add class when scrolling
    const header = document.querySelector('.header');
    const onScroll = () => {
        if (!header) return;
        if (window.scrollY > 24) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Attach click handlers to FAQ buttons (keyboard accessible)
    document.querySelectorAll('.faq-item').forEach((item, idx) => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => toggleFaq(idx));
        btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(idx); } });
    });

    // Event listener para mostrar/ocultar campos de vehículo
    const tipoSeguroSelect = document.getElementById('tipoSeguro');
    if (tipoSeguroSelect) {
        tipoSeguroSelect.addEventListener('change', updateVehicleFields);
    }
});

// Funciones para el modal de cotización
// (Se eliminaron las funciones del modal porque el formulario fue movido a `cotizar.html`)

function updateVehicleFields() {
    const tipoSeguro = document.getElementById('tipoSeguro');
    const vehicleSection = document.getElementById('vehicleSection');
    
    if (!tipoSeguro || !vehicleSection) return;
    
    const tipoValue = tipoSeguro.value;
    
    if (tipoValue === 'auto' || tipoValue === 'moto') {
        vehicleSection.style.display = 'block';
        
        // Hacer campos del vehículo requeridos
        const fields = ['matricula', 'fechaCarnet', 'marcaVehiculo', 'modeloVehiculo', 'anoVehiculo'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.required = true;
        });
    } else {
        vehicleSection.style.display = 'none';
        
        // Hacer campos del vehículo opcionales
        const fields = ['matricula', 'fechaCarnet', 'marcaVehiculo', 'modeloVehiculo', 'anoVehiculo'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.required = false;
        });
    }
}

// Eliminados listeners de cierre modal (ya no hay modal en index.html).

// La lógica de envío se mantiene en la página dedicada `cotizar.html` (función submitQuoteForm allí).
