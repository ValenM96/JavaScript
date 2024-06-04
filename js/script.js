const bebidas = [
    { id: 1, nombre: "Cerveza", precio: 1200 },
    { id: 2, nombre: "Vino", precio: 3500 },
    { id: 3, nombre: "Whisky", precio: 22000 },
    { id: 4, nombre: "Vodka", precio: 15000 }
];

function obtenerBebida() {
    while (true) {
        let nombreBebida = prompt("Ingrese el nombre de la bebida que desea comprar: (Cerveza, Vino, Whisky, Vodka)");
        let bebida = bebidas.find(b => b.nombre.toLowerCase() === nombreBebida.toLowerCase());
        if (bebida) {
            return bebida;
        } else {
            console.log("Bebida no encontrada. Por favor, ingrese un nombre válido.");
        }
    }
}

function obtenerValorCompra() {
    while (true) {
        let cantidad = prompt("Ingrese la cantidad que desea comprar:");
        cantidad = +cantidad;

        if (typeof cantidad === "number" && !isNaN(cantidad) && cantidad > 0) {
            return cantidad;
        } else {
            console.log("Por favor, ingrese una cantidad válida.");
        }
    }
}

function obtenerPlazoMeses() {
    while (true) {
        let plazoMeses = prompt("Seleccione la cantidad de cuotas: 3, 6, o 12 meses. Ingrese '1' para pagar en un único pago:");
        plazoMeses = +plazoMeses;

        if (plazoMeses === 1 || plazoMeses === 3 || plazoMeses === 6 || plazoMeses === 12) {
            return plazoMeses;
        } else {
            console.log("Por favor, seleccione una opción válida de cuotas: 3, 6, 12, o '1' para pago único.");
        }
    }
}

function calcularCuota(valorCompra, plazoMeses, tasaInteresMensual) {
    if (plazoMeses === 1) {
        return valorCompra;
    }

    let denominador = 1;
    for (let i = 0; i < plazoMeses; i++) {
        denominador *= (1 + tasaInteresMensual);
    }

    return valorCompra * tasaInteresMensual / (1 - 1 / denominador);
}

function calcularCuotas() {
    const bebida = obtenerBebida();
    const cantidad = obtenerValorCompra();
    const valorCompra = bebida.precio * cantidad;

    const tasaInteresAnual = 70;
    const tasaInteresMensual = 12.5 / 100;

    const plazoMeses = obtenerPlazoMeses();

    if (plazoMeses === 1) {
        console.log("El monto total de su compra es de $" + valorCompra.toFixed(2) + " ARG.");
    } else {
        const cuota = calcularCuota(valorCompra, plazoMeses, tasaInteresMensual);
        console.log("Su cuota es de $" + cuota.toFixed(2) + " ARG durante " + plazoMeses + " meses.");
    }
}

calcularCuotas();
