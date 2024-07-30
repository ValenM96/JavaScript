const productos = [
    { nombre: 'Johnnie Walker Red Label', precio: 25, imagen: 'assets/img/redLabel.webp' },
    { nombre: 'Johnnie Walker Black Label', precio: 30, imagen: 'assets/img/blackLabel.webp' },
    { nombre: 'Johnnie Walker Double Black', precio: 35, imagen: 'assets/img/dobleBlack.webp' },
    { nombre: 'Johnnie Walker Green Label', precio: 40, imagen: 'assets/img/greenLabel.webp' },
    { nombre: 'Johnnie Walker 18 Años', precio: 50, imagen: 'assets/img/18años.webp' },
    { nombre: 'Johnnie Walker Blue Label', precio: 100, imagen: 'assets/img/blueLabel.webp' },
    { nombre: 'Jack Daniels Old No. 7', precio: 35, imagen: 'assets/img/jackDaniels.webp' },
    { nombre: 'Jack Daniels Honey', precio: 40, imagen: 'assets/img/jackHoney.webp' },
    { nombre: 'Jack Daniels Fire', precio: 45, imagen: 'assets/img/jackFire.webp' },
    { nombre: 'Jack Daniels Rye', precio: 38, imagen: 'assets/img/jackRye.webp' },
    { nombre: 'Jack Daniels Gentleman', precio: 40, imagen: 'assets/img/Gentleman.webp' },
    { nombre: 'Jack Daniels Single Barrel', precio: 55, imagen: 'assets/img/jackSingleBarrel.webp' },
    { nombre: 'Macallan 12 Años', precio: 60, imagen: 'assets/img/12.1.webp' },
    { nombre: 'Macallan 18 Años', precio: 150, imagen: 'assets/img/18.1.webp' },
    { nombre: 'Macallan Sherry Oak', precio: 80, imagen: 'assets/img/macallanRare.webp' },
    { nombre: 'Macallan Fine Oak', precio: 90, imagen: 'assets/img/macallanRare.webp' },
    { nombre: 'Macallan Rare Cask', precio: 200, imagen: 'assets/img/macallanRare.webp' },
    { nombre: 'Macallan Edition No. 6', precio: 180, imagen: 'assets/img/macallanRare.webp' },
    { nombre: 'Glenfiddich 12 Años', precio: 55, imagen: 'assets/img/12años.webp' },
    { nombre: 'Glenfiddich 15 Años', precio: 70, imagen: 'assets/img/15años.webp' },
    { nombre: 'Glenfiddich 18 Años', precio: 100, imagen: 'assets/img/glenfiddich.18.webp' },
    { nombre: 'Glenfiddich 21 Años', precio: 150, imagen: 'assets/img/21años.webp' },
    { nombre: 'Glenfiddich Project XX', precio: 130, imagen: 'assets/img/vat.01.webp' },
    { nombre: 'Glenfiddich Winter Storm', precio: 250, imagen: 'assets/img/vat.02.webp' }
];

const toggleDropdown = () => {
    const dropdown = document.getElementById("marcas-dropdown");
    dropdown.style.display = (dropdown.style.display === "none") ? "block" : "none";
};

const mostrarMarca = (marca) => {
    const carouselId = obtenerCarouselId(marca);
    if (carouselId) mostrarCarousel(carouselId);
};

const obtenerCarouselId = (marca) => {
    const carousels = {
        'johnnie': 'johnnie-carousel',
        'jack': 'jack-carousel',
        'macallan': 'macallan-carousel',
        'glenfiddich': 'glenfiddich-carousel'
    };
    return carousels[marca] || null;
};

const carouselNext = (carouselId) => {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const itemWidth = carouselInner.querySelector('.carousel-item').offsetWidth;
        carouselInner.scrollTo({ left: carouselInner.scrollLeft + itemWidth, behavior: 'smooth' });
    }
};

const carouselPrev = (carouselId) => {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const itemWidth = carouselInner.querySelector('.carousel-item').offsetWidth;
        carouselInner.scrollTo({ left: carouselInner.scrollLeft - itemWidth, behavior: 'smooth' });
    }
};

const agregarProductoAlCarrito = (nombre, precio) => {
    const carritoProductos = obtenerCarritoProductos();
    const productoExistente = carritoProductos.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carritoProductos.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
    actualizarCarritoUI();
};

const obtenerCarritoProductos = () => {
    return JSON.parse(localStorage.getItem('carritoProductos')) || [];
};

const actualizarCarritoUI = () => {
    const carrito = document.getElementById('carrito');
    const carritoProductos = obtenerCarritoProductos();

    if (carrito) {
        const carritoProductosUI = document.querySelector('.carrito-productos');
        if (carritoProductosUI) {
            carritoProductosUI.innerHTML = carritoProductos.map((producto, index) => `
                <li class="carrito-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                    <div class="acciones">
                        <button onclick="eliminarProductoDelCarrito(${index})">Eliminar</button>
                    </div>
                </li>
            `).join('');
        }
        carrito.classList.add('open');
    }
};

const eliminarProductoDelCarrito = (index) => {
    const carritoProductos = obtenerCarritoProductos();
    carritoProductos.splice(index, 1);
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
    actualizarCarritoUI();
};

const vaciarCarrito = () => {
    localStorage.removeItem('carritoProductos');
    actualizarCarritoUI();
};

const toggleCarrito = () => {
    const carrito = document.getElementById('carrito');
    if (carrito) carrito.classList.toggle('open');
};

document.getElementById('carrito-button')?.addEventListener('click', toggleCarrito);

document.getElementById('finalizar-compra-btn').addEventListener('click', () => {
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "¡Compra finalizada!",
        showConfirmButton: false,
        timer: 1500
    });
    vaciarCarrito();
});

document.querySelector('.dropdown-btn')?.addEventListener('click', () => {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
});

window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropdown-btn')) {
        Array.from(document.getElementsByClassName('dropdown-content')).forEach(dropdown => {
            if (dropdown.classList.contains('show')) dropdown.classList.remove('show');
        });
    }
});

const loadUsers = async () => {
    return new Promise((resolve) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        resolve(users);
    });
};

const saveUsers = async (users) => {
    return new Promise((resolve) => {
        localStorage.setItem('users', JSON.stringify(users));
        resolve();
    });
};

const registerUser = async () => {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    if (username && password) {
        try {
            const users = await loadUsers();
            if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El usuario ya existe'
                });
            } else {
                users.push({ username, password });
                await saveUsers(users);
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'El usuario se ha registrado correctamente'
                });
                clearRegisterForm();
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al registrar el usuario'
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Vacíos',
            text: 'Por favor, completa todos los campos'
        });
    }
};

const loginUser = async () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (username && password) {
        try {
            const users = await loadUsers();
            const user = users.find(user => 
                user.username.toLowerCase() === username.toLowerCase() && user.password === password
            );

            if (user) {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido de nuevo'
                });
                clearLoginForm();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrectos'
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al iniciar sesión'
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Vacíos',
            text: 'Por favor, completa todos los campos'
        });
    }
};

const clearRegisterForm = () => {
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
};

const clearLoginForm = () => {
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
};

const toggleAuthContainer = () => {
    const authContainer = document.getElementById('auth-container');
    authContainer.style.display = authContainer.style.display === 'none' || !authContainer.style.display ? 'flex' : 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-button')?.addEventListener('click', toggleAuthContainer);
    document.getElementById('auth-container').style.display = 'none';
});

const apiML = async () => {
    try {
        const respuesta = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=Dalmore');
        if (!respuesta.ok) {
            return;
        }
        const datos = await respuesta.json();
        const data = datos.results;
        const productsAlt = document.getElementById('productsAlt');
        productsAlt.innerHTML = '';
        for (const item of data) {
            const ejemplo = document.createElement('div');
            ejemplo.className = 'product-item';
            ejemplo.innerHTML = `
                <h3>${item.title}</h3>
                <p>Precio: $${item.price}</p>
                <img src="${item.thumbnail}" alt="${item.title}">
                <button onclick="agregarProductoAlCarrito('${item.title}', ${item.price})">Agregar al carrito</button>
            `;
            productsAlt.appendChild(ejemplo);
        }
    } catch (error) {
    }
};

document.addEventListener('DOMContentLoaded', apiML);




