const productos = [
    // Johnnie Walker
    { nombre: 'Johnnie Walker Red Label', precio: 25, imagen: 'assets/img/redLabel.webp' },
    { nombre: 'Johnnie Walker Black Label', precio: 30, imagen: 'assets/img/blackLabel.webp' },
    { nombre: 'Johnnie Walker Double Black', precio: 35, imagen: 'assets/img/dobleBlack.webp' },
    { nombre: 'Johnnie Walker Green Label', precio: 40, imagen: 'assets/img/greenLabel.webp' },
    { nombre: 'Johnnie Walker 18 Años', precio: 50, imagen: 'assets/img/18años.webp' },
    { nombre: 'Johnnie Walker Blue Label', precio: 100, imagen: 'assets/img/blueLabel.webp' },

    // Jack Daniels
    { nombre: 'Jack Daniels Old No. 7', precio: 35, imagen: 'assets/img/jackDaniels.webp' },
    { nombre: 'Jack Daniels Honey', precio: 40, imagen: 'assets/img/jackHoney.webp' },
    { nombre: 'Jack Daniels Fire', precio: 45, imagen: 'assets/img/jackFire.webp' },
    { nombre: 'Jack Daniels Rye', precio: 38, imagen: 'assets/img/jackRye.webp' },
    { nombre: 'Jack Daniels Gentleman', precio: 40, imagen: 'assets/img/Gentleman.webp' },
    { nombre: 'Jack Daniels Single Barrel', precio: 55, imagen: 'assets/img/jackSingleBarrel.webp' },

    // Macallan
    { nombre: 'Macallan 12 Años', precio: 60, imagen: 'assets/img/12.1.webp' },
    { nombre: 'Macallan 18 Años', precio: 150, imagen: 'assets/img/18.1.webp' },
    { nombre: 'Macallan Sherry Oak', precio: 80, imagen: 'assets/img/macallanRare.webp' },
    { nombre: 'Macallan Fine Oak', precio: 90, imagen: 'assets/img/macallanRare.webp' },
    { nombre: 'Macallan Rare Cask', precio: 200, imagen: 'assets/img/macallanRare.webp' },
    { nombre: 'Macallan Edition No. 6', precio: 180, imagen: 'assets/img/macallanRare.webp' },

    // Glenfiddich
    { nombre: 'Glenfiddich 12 Años', precio: 55, imagen: 'assets/img/12años.webp' },
    { nombre: 'Glenfiddich 15 Años', precio: 70, imagen: 'assets/img/15años.webp' },
    { nombre: 'Glenfiddich 18 Años', precio: 100, imagen: 'assets/img/glenfiddich.18.webp' },
    { nombre: 'Glenfiddich 21 Años', precio: 150, imagen: 'assets/img/21años.webp' },
    { nombre: 'Glenfiddich Project XX', precio: 130, imagen: 'assets/img/vat.01.webp' },
    { nombre: 'Glenfiddich Winter Storm', precio: 250, imagen: 'assets/img/vat.02.webp' }
];

function toggleDropdown() {
    dropdown = document.getElementById("marcas-dropdown");
    if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function mostrarMarca(marca) {
    const carouselId = obtenerCarouselId(marca);
    if (carouselId) {
        mostrarCarousel(carouselId);
    }
}

function obtenerCarouselId(marca) {
    switch (marca) {
        case 'johnnie':
            return 'johnnie-carousel';
        case 'jack':
            return 'jack-carousel';
        case 'macallan':
            return 'macallan-carousel';
        case 'glenfiddich':
            return 'glenfiddich-carousel';
        default:
            return null;
    }
}

function mostrarCarousel(carouselId) {
    console.log("Mostrar carousel con ID: " + carouselId);
}

function carouselNext(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const itemWidth = carouselInner.querySelector('.carousel-item').offsetWidth;
        carouselInner.scrollTo({
            left: carouselInner.scrollLeft + itemWidth,
            behavior: 'smooth'
        });
    }
}

function carouselPrev(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const itemWidth = carouselInner.querySelector('.carousel-item').offsetWidth;
        carouselInner.scrollTo({
            left: carouselInner.scrollLeft - itemWidth,
            behavior: 'smooth'
        });
    }
}

function agregarProductoAlCarrito(nombre, precio) {
    const producto = { nombre, precio };
    const carritoProductos = obtenerCarritoProductos();
    const productoExistente = carritoProductos.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        producto.cantidad = 1;
        carritoProductos.push(producto);
    }

    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));

    actualizarCarritoUI();
}

function obtenerCarritoProductos() {
    const carritoProductos = localStorage.getItem('carritoProductos');
    return carritoProductos ? JSON.parse(carritoProductos) : [];
}

function actualizarCarritoUI() {
    const carrito = document.getElementById('carrito');
    const carritoProductos = obtenerCarritoProductos();

    if (carrito) {
        const carritoProductosUI = document.querySelector('.carrito-productos');
        if (carritoProductosUI) {
            carritoProductosUI.innerHTML = '';

            carritoProductos.forEach((producto, index) => {
                const item = document.createElement('li');
                item.classList.add('carrito-producto');
                item.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                    <div class="acciones">
                        <button onclick="eliminarProductoDelCarrito(${index})">Eliminar</button>
                    </div>
                `;
                carritoProductosUI.appendChild(item);
            });
        }
        carrito.classList.add('open');
    }
}

function eliminarProductoDelCarrito(index) {
    const carritoProductos = obtenerCarritoProductos();
    carritoProductos.splice(index, 1);
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
    actualizarCarritoUI();
}

function vaciarCarrito() {
    localStorage.removeItem('carritoProductos');
    actualizarCarritoUI();
}

function toggleCarrito() {
    const carrito = document.getElementById('carrito');
    if (carrito) {
        carrito.classList.toggle('open');
    }
}

const carritoButton = document.getElementById('carrito-button');
if (carritoButton) {
    carritoButton.addEventListener('click', toggleCarrito);
}
document.getElementById('finalizar-compra-btn').addEventListener('click', function() {
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "¡Compra finalizada!",
        showConfirmButton: false,
        timer: 1500
    });
    vaciarCarrito();
});

function vaciarCarrito() {
    localStorage.removeItem('carritoProductos');
    actualizarCarritoUI();
}

const dropdownButton = document.querySelector('.dropdown-btn');
if (dropdownButton) {
    dropdownButton.addEventListener('click', () => {
        const dropdownContent = dropdownButton.nextElementSibling;
        dropdownContent.classList.toggle('show');
    });
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
