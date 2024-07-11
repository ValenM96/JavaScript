const productos = [
    { id: 1, nombre: "Johnnie Walker Red Label", precio: 25 },
    { id: 2, nombre: "Johnnie Walker Black Label", precio: 30 },
    { id: 3, nombre: "Johnnie Walker Double Black", precio: 35 },
    { id: 4, nombre: "Johnnie Walker Green Label", precio: 40 },
    { id: 5, nombre: "Johnnie Walker 18 Años", precio: 50 },
    { id: 6, nombre: "Johnnie Walker Blue Label", precio: 100 },
    { id: 7, nombre: "Jack Daniels", precio: 28 },
    { id: 8, nombre: "Jack Daniels Honey", precio: 32 },
    { id: 9, nombre: "Jack Daniels Fire", precio: 35 },
    { id: 10, nombre: "Jack Daniels Apple", precio: 30 },
    { id: 11, nombre: "Jack Daniels Rye", precio: 38 },
    { id: 12, nombre: "Jack Daniels Gentleman", precio: 40 },
    { id: 13, nombre: "Macallan 12 Años", precio: 60 },
    { id: 14, nombre: "Macallan 15 Años", precio: 80 },
    { id: 15, nombre: "Macallan 18 Años", precio: 100 },
    { id: 16, nombre: "Macallan Rare Cask", precio: 150 },
    { id: 17, nombre: "Glenfiddich Vat 01", precio: 45 },
    { id: 18, nombre: "Glenfiddich Vat 02", precio: 50 },
    { id: 19, nombre: "Glenfiddich 12 Años", precio: 55 },
    { id: 20, nombre: "Glenfiddich 15 Años", precio: 65 },
    { id: 21, nombre: "Glenfiddich 18 Años", precio: 75 },
    { id: 22, nombre: "Glenfiddich 21 Años", precio: 100 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    if (listaCarrito) {
        listaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const carritoItem = document.createElement('div');
            carritoItem.classList.add('carrito-item');
            carritoItem.innerHTML = `
                ${item.nombre} - $${item.precio} x ${item.cantidad}
                <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                <input type="number" min="1" value="${item.cantidad}" onchange="actualizarCantidad(${item.id}, this.value)">
            `;
            listaCarrito.appendChild(carritoItem);
            total += item.precio * item.cantidad;
        });

        const carritoTotal = document.querySelector('.carrito-total');
        if (carritoTotal) {
            carritoTotal.textContent = `Total: $${total}`;
        } else {
            console.error('Elemento carrito-total no encontrado en el DOM.');
        }
    } else {
        console.error('Elemento lista-carrito no encontrado en el DOM.');
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarProductos(lista = productos) {
    const listaProductos = document.getElementById('lista-productos');
    if (listaProductos) {
        listaProductos.innerHTML = '';

        lista.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                ${producto.nombre} - $${producto.precio}
                <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Agregar</button>
            `;
            listaProductos.appendChild(productoDiv);
        });
    } else {
        console.error('Elemento lista-productos no encontrado en el DOM.');
    }
}

function agregarAlCarrito(id, nombre, precio) {
    let itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        itemEnCarrito = { id, nombre, precio, cantidad: 1 };
        carrito.push(itemEnCarrito);
    }

    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function actualizarCantidad(id, cantidad) {
    cantidad = parseInt(cantidad);
    if (cantidad > 0) {
        let itemEnCarrito = carrito.find(item => item.id === id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad = cantidad;
        }
        actualizarCarrito();
    } else {
        console.error('La cantidad debe ser mayor que cero.');
    }
}

function carouselNext(id) {
    const carousel = document.getElementById(id);
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        if (inner) {
            const items = inner.children.length;
            const visibleItems = 3;
            const maxIndex = Math.ceil(items / visibleItems) - 1;
            
            let currentIndex = parseInt(inner.style.transform.replace('translateX(', '').replace('%)', '')) || 0;
            currentIndex = Math.abs(currentIndex / 100);

            if (currentIndex < maxIndex) {
                inner.style.transform = `translateX(${-((currentIndex + 1) * 100)}%)`;
            } else {
                inner.style.transform = `translateX(0%)`;
            }
        }
    }
}

function carouselPrev(id) {
    const carousel = document.getElementById(id);
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        if (inner) {
            const items = inner.children.length;
            const visibleItems = 3;
            const maxIndex = Math.ceil(items / visibleItems) - 1;
            
            let currentIndex = parseInt(inner.style.transform.replace('translateX(', '').replace('%)', '')) || 0;
            currentIndex = Math.abs(currentIndex / 100);

            if (currentIndex > 0) {
                inner.style.transform = `translateX(${-((currentIndex - 1) * 100)}%)`;
            } else {
                inner.style.transform = `translateX(-${maxIndex * 100}%)`;
            }
        }
    }
}

function mostrarCarousel(id) {
    const carouselSection = document.getElementById(id);
    if (carouselSection) {
        carouselSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Cargar productos y actualizar carrito al inicio
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarrito();
});
