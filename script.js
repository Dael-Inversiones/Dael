document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    // Mostrar mensaje de bienvenida con animación
    const welcomeOverlay = document.getElementById('welcome-message');
    welcomeOverlay.classList.add('show');

    // Animación de entrada con GSAP
    gsap.from('.welcome-content h1', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.welcome-content h2', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3
    });

    gsap.from('.welcome-content p', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.7
    });

    gsap.from('.welcome-icon', {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    // Efecto de paralaje en el fondo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelector('.parallax-bg').style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Ocultar mensaje de bienvenida y mostrar formulario después de 5 segundos
    setTimeout(() => {
        gsap.to('.welcome-overlay', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                welcomeOverlay.style.display = 'none';
                document.querySelector('.container').classList.add('show');
                
                // Animar la entrada del formulario
                gsap.from('.form-group', {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1
                });
            }
        });
    }, 5000);

    // Obtener el formulario
    const form = document.getElementById('pedidoForm');

    // Agregar el evento de envío al formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const categoria = document.getElementById('categoria').value;
        const detalle = document.getElementById('detalle').value;

        // Crear el mensaje para WhatsApp
        const mensaje = `*Nuevo Pedido*%0A%0A` +
                       `*Nombre:* ${nombre}%0A` +
                       `*Teléfono:* ${telefono}%0A` +
                       `*Dirección:* ${direccion}%0A` +
                       `*Categoría:* ${categoria}%0A` +
                       `*Detalle:* ${detalle}`;

        // Número de WhatsApp
        const numeroWhatsApp = '51906301003';

        // Crear el enlace de WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

        // Animación de envío
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // Simular envío
        setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="check"></i> ¡Enviado!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

            // Redirigir a WhatsApp después de una breve pausa
            setTimeout(() => {
                window.open(urlWhatsApp, '_blank');
                
                // Resetear el botón
                submitBtn.innerHTML = '<i data-lucide="send"></i> Enviar Pedido';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Reinicializar los iconos después de cambiar el contenido
                lucide.createIcons();
            }, 1500);
        }, 2000);
    });

    // Efectos de hover en los campos del formulario
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = 'var(--accent-color)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label').style.color = '';
        });
    });
});