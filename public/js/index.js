const socket = io();

socket.on('connect', () => {
    socket.emit('getProducts');
});

const productList = document.getElementById("productList");
const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");



// Emitir el evento 'getProducts' después de que la página se haya cargado

window.onload = function() {
    socket.emit('getProducts');
};


// Agregar productos
addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    const response = await fetch("/realtimeproducts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, price, description})
    })

    if (response.ok) {
        swal("Producto agregado", "El producto se agregó correctamente", "success");
    } else {
        swal("Error", "Hubo un error al agregar el producto", "error");
    }

    addForm.reset();
    socket.emit('getProducts'); // Solicitar la lista actualizada de productos
})

//eliminar un producto
deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const response = await fetch(`/realtimeproducts`, {
        method: 'DELETE',
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify({ id }),
    });

    if (response.ok) {
        swal("Producto eliminado", "El producto se eliminó correctamente", "success");
    } else {
        swal("Error", "Hubo un error al eliminar el producto", "error");
    }

    deleteForm.reset();
    socket.emit('getProducts');
});

//recibir los productos
//const productList = document.getElementById('productList');

socket.on("products", (data) => {

    productList.innerHTML = "";
    data.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card", "flex-fill", "bg-dark", "text-white");
        card.style.width = "18rem";
        card.style.borderRadius = "5px"; // Hace que el borde sea un poco redondeado
        card.style.border = "1px solid white"; // Agrega un borde blanco
        card.style.margin = "5px"; // Agrega un margen de 10px
        card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">ID: ${product.id}</p>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.price}</p>
      </div>
    `;
        productList.appendChild(card);
    });
    deleteForm.reset();

})