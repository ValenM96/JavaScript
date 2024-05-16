function calcularCuotas() {
    let valorCompra = prompt("Ingrese el valor total de su compra:");
    valorCompra = +valorCompra;

    const tasaInteresAnual = 15;
    const tasaInteresMensual = tasaInteresAnual / 12 / 100;

    let plazoMeses = prompt("Seleccione la cantidad de cuotas: 3, 6, o 12 meses. Ingrese '1' para pagar en un unico pago:");
    plazoMeses = +plazoMeses;

    if (plazoMeses === 1) {
        console.log("El monto total de su compra es de $" + valorCompra.toFixed(2) + " ARG.");
    } else if (plazoMeses === 3 || plazoMeses === 6 || plazoMeses === 12) {
        let denominador = 1;
        for (let i = 0; i < plazoMeses; i++) {
            denominador *= (1 + tasaInteresMensual);
        }

        const cuota = valorCompra * tasaInteresMensual / (1 - 1 / denominador);

        console.log("Su cuota es de $" + cuota.toFixed(2) + " ARG durante " + plazoMeses + " meses.");
    } else {
        console.log("Por favor, seleccione una opción válida de cuotas: (3, 6, 12), o '1' para pago único.");
    }
}

calcularCuotas();
