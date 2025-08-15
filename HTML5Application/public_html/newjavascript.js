document.addEventListener("DOMContentLoaded", () => {
    const botonesCarrito = document.querySelectorAll(".carrito-icono");

    if (botonesCarrito.length > 0) {
        botonesCarrito.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                const producto = e.target.closest(".producto");
                const nombre = producto.dataset.nombre;
                const precio = parseFloat(producto.dataset.precio);
                const imagen = producto.dataset.imagen;

                agregarAlCarrito({ nombre, precio, imagen });
            });
        });
    }

    if (document.querySelector(".carrito-container")) {
        mostrarCarrito();
    }
});

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    const carritoContainer = document.querySelector(".carrito-container");
    const totalElemento = document.querySelector(".total");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoContainer.innerHTML = "";

    let total = 0;
    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto-carrito");

        div.innerHTML = `
            <div class="producto-info">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-detalles">
                    <strong>${producto.nombre}</strong>
                    <span>Cantidad: ${producto.cantidad}</span>
                    <span class="precio">$${producto.precio} MXN</span>
                </div>
            </div>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;

        carritoContainer.appendChild(div);
        total += producto.precio * producto.cantidad;
    });

    totalElemento.textContent = `Total: $${total} MXN`;

    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach((btn) => {
        btn.addEventListener("click", eliminarProducto);
    });

    const btnVaciar = document.querySelector(".btn-vaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            mostrarCarrito();
        });
    }
}

function eliminarProducto(e) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = e.target.dataset.index;

    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
