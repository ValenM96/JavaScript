const productos = [
    { id: 1, nombre: "Cerveza", precio: 1200, categoria: "Bebidas Alcohólicas" },
    { id: 2, nombre: "Vino", precio: 3500, categoria: "Bebidas Alcohólicas" },
    { id: 3, nombre: "Whisky", precio: 22000, categoria: "Bebidas Alcohólicas" },
    { id: 4, nombre: "Vodka", precio: 15000, categoria: "Bebidas Alcohólicas" },
    { id: 5, nombre: "Ron", precio: 13000, categoria: "Bebidas Alcohólicas" },
    { id: 6, nombre: "Tequila", precio: 18000, categoria: "Bebidas Alcohólicas" },
    { id: 7, nombre: "Gin", precio: 16000, categoria: "Bebidas Alcohólicas" },
    { id: 8, nombre: "Champagne", precio: 25000, categoria: "Bebidas Alcohólicas" },
    { id: 9, nombre: "Vermouth", precio: 7000, categoria: "Bebidas Alcohólicas" },
    { id: 10, nombre: "Sidra", precio: 3000, categoria: "Bebidas Alcohólicas" },
    { id: 11, nombre: "Fernet", precio: 7500, categoria: "Bebidas Alcohólicas" },
    { id: 12, nombre: "Aperol", precio: 8500, categoria: "Bebidas Alcohólicas" },
    { id: 13, nombre: "Cynar", precio: 6500, categoria: "Bebidas Alcohólicas" },
    { id: 14, nombre: "Cognac", precio: 32000, categoria: "Bebidas Alcohólicas" },
    { id: 15, nombre: "Pisco", precio: 14000, categoria: "Bebidas Alcohólicas" },
    { id: 16, nombre: "Licor de Café", precio: 9000, categoria: "Bebidas Alcohólicas" },
    { id: 17, nombre: "Licor de Cacao", precio: 8500, categoria: "Bebidas Alcohólicas" },
    { id: 18, nombre: "Licor de Menta", precio: 8000, categoria: "Bebidas Alcohólicas" }
];

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || null;

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
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

    document.querySelector('.carrito-total').textContent = `Total: $${total}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarProductos(lista = productos) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';

    const categorias = [...new Set(lista.map(p => p.categoria))];

    categorias.forEach(categoria => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.classList.add('categoria');
        categoriaDiv.innerHTML = `<h3>${categoria}</h3>`;

        lista
            .filter(p => p.categoria === categoria)
            .forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');
                productoDiv.innerHTML = `
                    ${producto.nombre} - $${producto.precio}
                    <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
                `;
                categoriaDiv.appendChild(productoDiv);
            });

        listaProductos.appendChild(categoriaDiv);
    });
}

document.getElementById('busqueda').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchText));
    cargarProductos(productosFiltrados);
});

document.getElementById('filtro-categoria').addEventListener('change', (e) => {
    const categoriaSeleccionada = e.target.value;
    const productosFiltrados = categoriaSeleccionada ? 
        productos.filter(producto => producto.categoria === categoriaSeleccionada) : productos;
    cargarProductos(productosFiltrados);
});

document.getElementById('ordenar-precio').addEventListener('change', (e) => {
    const ordenSeleccionado = e.target.value;
    const productosOrdenados = [...productos].sort((a, b) => {
        if (ordenSeleccionado === 'asc') return a.precio - b.precio;
        if (ordenSeleccionado === 'desc') return b.precio - a.precio;
        return 0;
    });
    cargarProductos(productosOrdenados);
});

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(p => p.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

function actualizarCantidad(id, cantidad) {
    const itemEnCarrito = carrito.find(p => p.id === id);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad = parseInt(cantidad);
    }
    actualizarCarrito();
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
            usuarioActual = usuario;
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
            alert('Inicio de sesión exitoso');
        } else {
            alert('Email o contraseña incorrectos');
        }
    });
    
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
    
        const usuarioExistente = usuarios.find(u => u.email === email);
        if (usuarioExistente) {
            alert('El email ya está registrado');
            return;
        }
    
        const nuevoUsuario = { name, email, password };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Registro exitoso, ahora puedes iniciar sesión');
    });
    
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
            return;
        }
        setTimeout(() => {
            alert('Compra realizada con éxito. Gracias por tu compra!');
            carrito.length = 0;
            actualizarCarrito();
        }, 1000);
    });
    
    cargarProductos();
    actualizarCarrito();
    
