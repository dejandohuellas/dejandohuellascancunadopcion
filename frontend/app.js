const animalesContainer = document.querySelector('.animales');
const especieSelect = document.getElementById('especie');
const edadSelect = document.getElementById('edad');
const modal = document.querySelector('#animalModal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.close');
const adoptarBtn = document.getElementById('adoptar-btn');
const adopcionModal = document.getElementById('adopcionModal');
const closeAdopcion = document.querySelector('.close-adopcion');

// Función para obtener los datos de los animales desde la API
async function obtenerAnimales() {
    try {
        const response = await fetch('https://dejandohuellascancunadopcion.vercel.app/api/animales');
        if (!response.ok) throw new Error('Error al obtener los datos');
        const animales = await response.json();
        mostrarAnimales(animales);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar los animales en la página
function mostrarAnimales(animales) {
    animalesContainer.innerHTML = ''; // Limpiar contenedor
    animales.forEach(animal => {
        const animalDiv = document.createElement('div');
        animalDiv.classList.add('animal-card');
        animalDiv.innerHTML = `
            <img src="${animal.imagenUrl}" alt="${animal.nombre}">
            <h3 class="animal-name">${animal.nombre}</h3>
            <p class="animal-description">${animal.descripcion}</p>
            <button class="ver-mas">Ver más</button>
        `;

        // Evento "Ver más"
        animalDiv.querySelector('.ver-mas').addEventListener('click', () => {
            mostrarDetallesAnimal(animal);
        });

        animalesContainer.appendChild(animalDiv);
    });
}

// Función para mostrar detalles de un animal en el modal
function mostrarDetallesAnimal(animal) {
    document.getElementById('animalImage').src = animal.imagenUrl;
    document.getElementById('animalName').textContent = animal.nombre;
    document.getElementById('animalDescription').textContent = animal.descripcion;
    document.getElementById('animalDetails').innerHTML = `
        <p>Raza: ${animal.raza || 'No especificado'}</p>
        <p>Sexo: ${animal.sexo}</p>
        <p>Tamaño: ${animal.tamaño}</p>
        <p>Características: ${animal.caracteristicas || 'No especificado'}</p>
        <p>Historia: ${animal.historia}</p>
    `;
    modal.style.display = 'block';
}

// Filtrar animales según la selección
async function filtrarAnimales() {
    const especieSeleccionada = especieSelect.value;
    const edadSeleccionada = edadSelect.value;

    try {
        const response = await fetch(`https://dejandohuellascancunadopcion.vercel.app/api/animales?especie=${especieSeleccionada}&edad=${edadSeleccionada}`);
        const animalesFiltrados = await response.json();
        mostrarAnimales(animalesFiltrados);
    } catch (error) {
        console.error('Error al filtrar animales:', error);
    }
}

// Eventos para los filtros
especieSelect.addEventListener('change', filtrarAnimales);
edadSelect.addEventListener('change', filtrarAnimales);

// Cerrar modales
modalClose.addEventListener('click', () => modal.style.display = 'none');
closeAdopcion.addEventListener('click', () => adopcionModal.style.display = 'none');

// Cargar animales al inicio
obtenerAnimales();
