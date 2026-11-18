class Producto {
    constructor(codigo, nombre, precio, categoria, stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    vender(cantidad) {
        if (!Number.isInteger(cantidad) || cantidad <= 0 || cantidad > this.stock) {
            return false;
        }

        this.stock -= cantidad;
        return true;
    }
}

const lapiz = new Producto(1, "Lápiz", 120, "Escritura", 10);
const cuaderno = new Producto(2, "Cuaderno", 250, "Papelería", 6);
const lapicera = new Producto(3, "Lapicera", 180, "Escritura", 8);
const carpeta = new Producto(4, "Carpeta", 350, "Papelería", 4);
const goma = new Producto(5, "Goma", 90, "Accesorios", 12);

const catalogo = [lapiz, cuaderno, lapicera, carpeta, goma];
const carrito = [];
const costoEnvio = 500;

function mostrarMensaje(mensaje) {
    console.log(mensaje);
    alert(mensaje);
}

function armarMenu(productos) {
    const disponibles = productos.filter(producto => producto.stock > 0);

    if (disponibles.length === 0) {
        return "No quedan productos disponibles.\n0. Finalizar compra";
    }

    let menu = "Ingresá el código de un producto:\n";

    for (const producto of disponibles) {
        menu += producto.codigo + ". " + producto.nombre + " (" + producto.categoria + ") - $" +
            producto.precio + " - Stock: " + producto.stock + "\n";
    }

    return menu + "0. Finalizar compra";
}

function mostrarResumen(compras, envio) {
    if (compras.length === 0) {
        mostrarMensaje("El carrito está vacío.");
        return;
    }

    const subtotal = compras.reduce((suma, compra) => suma + compra.importe, 0);
    let resumen = "Resumen de compra:\n";

    for (const compra of compras) {
        resumen += compra.cantidad + " x " + compra.producto.nombre +
            " - $" + compra.importe.toFixed(2) + "\n";
    }

    resumen += "Subtotal: $" + subtotal.toFixed(2) + "\n";
    resumen += "Envío: $" + envio + "\n";
    resumen += "Total: $" + (subtotal + envio).toFixed(2);
    mostrarMensaje(resumen);
}

while (true) {
    const entrada = prompt(armarMenu(catalogo));

    if (entrada === null || entrada.trim() === "0") {
        break;
    }

    const codigo = Number(entrada);
    const producto = catalogo.find(item => item.codigo === codigo);

    if (!producto || producto.stock === 0) {
        mostrarMensaje("Elegí el código de un producto disponible.");
        continue;
    }

    const respuesta = prompt("¿Cuántas unidades de " + producto.nombre + " querés?");

    if (respuesta === null) {
        continue;
    }

    const cantidad = Number(respuesta);

    if (producto.vender(cantidad)) {
        const importe = producto.precio * cantidad;
        carrito.push({ producto, cantidad, importe });
        mostrarMensaje("Agregaste " + cantidad + " x " + producto.nombre +
            ". Stock restante: " + producto.stock + ".");
    } else {
        mostrarMensaje("Cantidad inválida o stock insuficiente. Stock disponible: " +
            producto.stock + ".");
    }
}

mostrarResumen(carrito, costoEnvio);