

let formulario = document.querySelector("#formulario");

let nombreInput = document.querySelector("#nombre");

let calle = document.querySelector("#calle");

let numeroTel = document.querySelector("#telefono")

let btnEnviar = document.querySelector("#enviar");

let lista = document.querySelector("#lista");

let borrarCarrito = document.querySelector("#borrarLista");

let nuevo = document.getElementById("contenedor");











formulario.addEventListener("submit", validarFormulario);



let data = [{
    id: 1,
    nombre: "Fernet Branca",
    precio: 700,
    litros: "750ml",
    imagen: "https://www.brancastore.com.ar/141-home_default/fernet-branca-750ml.jpg",
},

{
    id: 2,
    nombre: "1882 Fernet",
    precio: 400,
    litros: "750ml",
    imagen: "https://www.espaciovino.com.ar/media/default/0001/56/thumb_55863_default_big.jpeg",
},
{
    id: 3,
    nombre: "Coca Cola",
    precio: 225,
    litros: "2,25ml",
    imagen: "https://d2r9epyceweg5n.cloudfront.net/stores/001/342/710/products/coca-cola-225-lt1-754433737485820c0116262980449994-1024-1024.jpg",
},
{
    id: 4,
    nombre: "Manaos Pomelo",
    precio: 120,
    litros: "2,25ml",
    imagen: "https://ardiaprod.vteximg.com.br/arquivos/ids/187188-1000-1000/Gaseosa-Manaos-Pomelo-225-Lts-_1.jpg?v=637427600912470000.jpeg",
},
{
    id: 5,
    nombre: "Vino Tinto Termidor Intenso",
    precio: 167,
    litros: "1lt",
    imagen: "https://ardiaprod.vteximg.com.br/arquivos/ids/219801-1000-1000/Vino-Tinto-Termidor-Intenso-1-Lt-_1.jpg?v=637790487387500000",
},
]




// ------------------ Validación del formulario y creacion boton COMPRAR -----------------

function validarFormulario(e) {
    e.preventDefault();
    let confirmacion = document.querySelector("#bienvenida")
    confirmacion.innerHTML = `<div class="divBenvenida"><h4>Bienvenid@ ${nombreInput.value}!</h4></div>`
    confirmacion.className = "confirmacion"
    formulario.remove();
    if (nombreInput.value != " ") {
        let buttons = document.querySelector(".botones")
        let btnHacerCompra = document.createElement("button")
        btnHacerCompra.innerHTML = `Comprar`
        btnHacerCompra.classList.add("botonHacerCompra")
        buttons.append(btnHacerCompra)
        let advertencia = document.querySelector(".infoDatos")
        advertencia.style.display = "none"

        btnHacerCompra.addEventListener("click", () => {
            Swal.fire({
                title: 'Confirma tu compra',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Compra exitosa!',
                    `te lo enviaremos a ${calle.value}`,
                    'success'
                  )
                }
              })
        })
    }




}



function mostrarProductos(data) {
    let resultado = ""
    let nuevo = document.getElementById("contenedor");
    data.forEach(element => {
        resultado += `<div class="objetos"><div class="objetoss card" style="width: 18rem;">
        <img src="${element.imagen}" class="card-img-top" alt="...">
        <div class=" tarjeta card-body">
          <h5 id="nombre-producto" class="card-title"> ${element.nombre} </h5>
          <h5 id="precio-producto" class="precios card-title"> ${element.precio} </h5>
          <button class="btnAgregar"> Agregar al Carrito </button>
        </div>
      </div>
      </div>
        `
        nuevo.innerHTML = resultado

    });
}




class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
    getPrecio() {
        return parseInt(this.precio);
    }



}

let listaCarrito = [];



function activarBoton() {
    let botones = document.querySelectorAll(".btnAgregar");
    botones.forEach((boton) => {
        boton.addEventListener("click", function (e) {
            let element = e.target.parentElement.parentElement
            let nombre = element.querySelector("#nombre-producto").innerText;
            let precio = element.querySelector("#precio-producto").innerText;

            console.log(element)

            listaCarrito.push(new Producto(nombre, precio))

            console.log(listaCarrito)
            localStorage.setItem("productos", JSON.stringify(listaCarrito))
            let productoStorage = JSON.parse(localStorage.getItem('productos'))
            let li = document.createElement("li")
            let precioCompra = document.createElement("h3")
            li.className = "itemCarrito"
            li.innerHTML = `PRODUCTO AGREGADO: ${nombre}`
            precioCompra.className = "precio2"
            precioCompra.innerHTML = `Precio: $${precio}`
            lista.append(li)
            lista.append(precioCompra)

            Toastify({
                text: `Se agregó al carrito \n${nombre}`,
                duration: 2500,
                gravity: "bottom",
                backgroundColor: "rgb(84, 192, 84)"
            }).showToast()









        })

    })
}





let botonMostrar = document.querySelector("#mostrar-todo")

function activarMostrarTodo() {
    botonMostrar.addEventListener("click", mostrarPrecioTotal);

}

function mostrarPrecioTotal() {
    let precioTotal = 0;
    listaCarrito.forEach((precios) => {
        precioTotal += precios.getPrecio();
    })
    Swal.fire({
        title: `Precio total \n$${precioTotal}`,
        icon: 'info',
        confirmButtonText: 'Ok',
        timer: 1500
    })

}


function mostrarTotalTodo() {
    botonMostrar.addEventListener("click", listaTotal)
}



function leerLocalStorage() {
    let todoStored = localStorage.getItem('productos')
    if (todoStored !== null) {
        let li = document.createElement("li")
        li.className = "itemCarrito"
        li.innerHTML = `PRODUCTO AGREGADO:\n${nombre}`
        lista.append(li)
    }

}



borrarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: 'Queres eliminar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Se ha borrado',
                'con exito!',
                'success'
            )

        }
        localStorage.clear();
        lista.innerText = ""
        listaCarrito.innerHTML = [];
    })
})










document.addEventListener("DOMContentLoaded", function () {
    mostrarProductos(data);
    activarBoton();
    activarMostrarTodo();

});













