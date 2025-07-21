document.addEventListener("DOMContentLoaded", function () {
    // === Filtro por área ===
    const filterSelect = document.getElementById('area');
    const cards = document.querySelectorAll('.project-card');

    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const selectedArea = filterSelect.value;
            cards.forEach(card => {
                const cardArea = card.getAttribute('data-area');
                card.style.display = (selectedArea === 'all' || cardArea === selectedArea) ? 'flex' : 'none';
            });
        });
    }

    // === Menú lateral perfil ===
    const menuItems = document.querySelectorAll('.perfil-menu li');
    const sections = document.querySelectorAll('.perfil-section');

    if (menuItems.length && sections.length) {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active'));
                sections.forEach(sec => sec.classList.remove('active'));

                item.classList.add('active');
                const sectionId = item.dataset.section;
                const targetSection = document.getElementById(sectionId);
                if (targetSection) targetSection.classList.add('active');
            });
        });
    }

    // === Simulación de carga ===
    const formUpload = document.getElementById('upload-form');
    const uploadDate = document.getElementById('upload-date');

    if (formUpload && uploadDate) {
        formUpload.addEventListener('submit', function (e) {
            e.preventDefault();
            const now = new Date();
            const formatted = now.toLocaleString('es-CL', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            uploadDate.textContent = formatted;
            alert('Archivo subido con éxito.');
        });
    }

    // === Formulario proyecto ejemplo ===
    const formProyecto = document.getElementById('form-proyecto');
    if (formProyecto) {
        formProyecto.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Proyecto enviado:\n' +
                'Nombre: ' + formProyecto.nombre.value + '\n' +
                'Requisitos: ' + formProyecto.requisitos.value + '\n' +
                'Área: ' + formProyecto.area.value + '\n' +
                'Duración: ' + formProyecto.duracion.value + '\n' +
                'Descripción: ' + formProyecto.descripcion.value);
            formProyecto.reset();
        });
    }

    // === Empresa menú lateral ===
    const empresaItems = document.querySelectorAll(".empresa-menu li");
    const empresaSections = document.querySelectorAll(".empresa-section");

    if (empresaItems.length && empresaSections.length) {
        empresaItems.forEach(item => {
            item.addEventListener("click", () => {
                empresaItems.forEach(i => i.classList.remove("active"));
                empresaSections.forEach(sec => sec.classList.remove("active"));

                const sectionId = item.dataset.section;
                const targetSection = document.getElementById(sectionId);
                if (targetSection) targetSection.classList.add("active");
                item.classList.add("active");
            });
        });
    }

    const btnNuevoProyecto = document.getElementById("btn-nuevo-proyecto");
    const btnCancelar = document.getElementById("btn-cancelar-proyecto");

    if (btnNuevoProyecto && btnCancelar) {
        const activarTab = (sectionId) => {
            empresaItems.forEach(item => item.classList.remove("active"));
            empresaSections.forEach(sec => sec.classList.remove("active"));
            const activeTab = document.querySelector(`.empresa-menu li[data-section="${sectionId}"]`);
            const activeSection = document.getElementById(sectionId);
            if (activeTab) activeTab.classList.add("active");
            if (activeSection) activeSection.classList.add("active");
        };

        btnNuevoProyecto.addEventListener("click", () => activarTab("agregar-proyecto"));
        btnCancelar.addEventListener("click", () => activarTab("empresa-proyectos"));
    }

    // === Tabs (docente a estudiante) ===
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const parent = this.closest('.perfil-section');
            parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const target = this.dataset.tab;
            parent.querySelector(`#${target}`).classList.add('active');
        });
    });

    // === Ver más proyecto asignado ===
    document.querySelectorAll('.view-more').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.project-card');
            card.classList.toggle('expanded');
            this.textContent = card.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
        });
    });

    // === Ver más proyecto general ===
    document.querySelectorAll('.projecto-general-view-more').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.projecto-general-card');
            card.classList.toggle('expanded');
            this.textContent = card.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
        });
    });

    // === Notificación al postular ===
    const applyButtons = document.querySelectorAll('.apply-button');
    const toast = document.getElementById('toast-notification');

    if (applyButtons.length && toast) {
        applyButtons.forEach(button => {
            button.addEventListener('click', function () {
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            });
        });
    }

    // === Filtro proyectos (asignados/sin asignar) ===
    const btnAsignados = document.getElementById('btn-asignados');
    const btnSinAsignar = document.getElementById('btn-sin-asignar');
    const asignados = document.getElementById('asignados');
    const sinAsignar = document.getElementById('sin-asignar');

    if (btnAsignados && btnSinAsignar && asignados && sinAsignar) {
        btnAsignados.addEventListener('click', () => {
            asignados.classList.remove('hidden');
            sinAsignar.classList.add('hidden');
            btnAsignados.classList.add('active');
            btnSinAsignar.classList.remove('active');
        });

        btnSinAsignar.addEventListener('click', () => {
            sinAsignar.classList.remove('hidden');
            asignados.classList.add('hidden');
            btnSinAsignar.classList.add('active');
            btnAsignados.classList.remove('active');
        });
    }

    // === Menú hamburguesa ===
    const toggleButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    } else {
        console.warn("No se encontró el menú o el botón hamburguesa.");
    }
});
