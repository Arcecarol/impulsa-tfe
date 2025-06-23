document.addEventListener("DOMContentLoaded", () => {
    // === Filtro de proyectos por área ===
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

    // === Panel de perfil (menú lateral) ===
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
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    // === Simulación de carga de archivo con fecha ===
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
});


document.addEventListener("DOMContentLoaded", () => {
    // === Panel de perfil empresa ===
    const menuItems = document.querySelectorAll('.empresa-menu li');
    const sections = document.querySelectorAll('.empresa-section');

    if (menuItems.length && sections.length) {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Quitar clase activa del menú
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Mostrar sección correspondiente
                const target = item.getAttribute('data-section');
                sections.forEach(section => {
                    section.classList.toggle('active', section.id === target);
                });
            });
        });
    }
});

//=== subida de archivo y evaluación de docente a estudiante ===
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

//=== ver más proyecto asignado ===
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.view-more');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.project-card');
            card.classList.toggle('expanded');
            this.textContent = card.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
        });
    });
});






//=== ver más proyecto general ===
document.addEventListener('DOMContentLoaded', function () {
    const viewMoreButtons = document.querySelectorAll('.projecto-general-view-more');

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.projecto-general-card');
            card.classList.toggle('expanded');
            this.textContent = card.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
        });
    });
});

// Notificación personalizada al postular
const applyButtons = document.querySelectorAll('.apply-button');
const toast = document.getElementById('toast-notification');

applyButtons.forEach(button => {
    button.addEventListener('click', function () {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000); // 3 segundos
    });
});


// JS para acordeón
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
    });
});

// JS para menú burger (si no lo tenés en script.js)
document.getElementById('burger-menu').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});


// ver más postulación estudiante
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', () => {
        const detalle = button.nextElementSibling;
        detalle.classList.toggle('visible');
        button.textContent = detalle.classList.contains('visible') ? 'Ver menos' : 'Ver más';
    });
});


//submenu
// Referencias a botones y contenedores
const btnAsignados = document.getElementById('btn-asignados');
const btnSinAsignar = document.getElementById('btn-sin-asignar');
const asignados = document.getElementById('asignados');
const sinAsignar = document.getElementById('sin-asignar');

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

// Función filtro que revisa solo el contenedor visible
function filtrarProyectos() {
    const nombre = document.getElementById('filter-nombre').value.toLowerCase();
    const area = document.getElementById('filter-area').value;

    // Determinar contenedor visible
    const contenedorVisible = asignados.classList.contains('hidden') ? sinAsignar : asignados;

    // Filtrar tarjetas en el contenedor visible
    contenedorVisible.querySelectorAll('.project-card').forEach(card => {
        const cardNombre = card.getAttribute('data-nombre').toLowerCase();
        const cardArea = card.getAttribute('data-area');
        const matchNombre = !nombre || cardNombre.includes(nombre);
        const matchArea = !area || cardArea === area;
        card.style.display = (matchNombre && matchArea) ? 'block' : 'none';
    });
}



//empresa

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".empresa-menu li");
    const sections = document.querySelectorAll(".empresa-section");

    function activarTab(sectionId) {
        menuItems.forEach(item => item.classList.remove("active"));
        sections.forEach(sec => sec.classList.remove("active"));

        const activeTab = document.querySelector(`.empresa-menu li[data-section="${sectionId}"]`);
        const activeSection = document.getElementById(sectionId);

        if (activeTab) activeTab.classList.add("active");
        if (activeSection) activeSection.classList.add("active");
    }

    // Click en menú lateral
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const sectionId = item.getAttribute("data-section");
            activarTab(sectionId);
        });
    });

    // Click en botón +
    const btnNuevoProyecto = document.getElementById("btn-nuevo-proyecto");
    btnNuevoProyecto.addEventListener("click", () => {
        activarTab("agregar-proyecto");
    });

    // Click en botón Cancelar
    const btnCancelar = document.getElementById("btn-cancelar-proyecto");
    btnCancelar.addEventListener("click", () => {
        activarTab("empresa-proyectos");
    });
});


