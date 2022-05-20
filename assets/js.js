


// Esta funcion va a duplicar las tareas 
function printTask (tasks) {
   //identidicar el contenedor 
    const container = document.getElementById('task-container')
   //generar el contenido
   let html = '';
   for (let i = 0; i < tasks.length; i++) {
      html += ` <div class="col-md-6 col-lg-4 mt-3">
      
      <div class="card" >
       <img src='${tasks[i].image}'>
         <div class="card-body">
         <h5 class="card-title">${tasks[i].id}</h5>
         <p class="card-text">${tasks[i].name}</p>
         <div class="text-end">
         <button class="btn btn-danger" onclick="deleteProduct(${tasks[i].id})">
         <i class="fa-solid fa-trash-can"></i> 
         </button>
         <button class="btn btn-primary" onclick="editProduct(${tasks[i].id})">
         <i class="fa-solid fa-pen"></i>
         </button>
         </div>
         </div>
         
         
         </div>
         </div>
        
         
                    `
       
   }
   // imprimir el HTML
  container.innerHTML = html;
}

const baseUrl = 'https://e-commerce-api-academlo.herokuapp.com/api'
let editingId = null;

// Con esta funcion le vamos a pedir las tareas al backend
function getTask() {
axios.get('https://e-commerce-api-academlo.herokuapp.com/api/products')
.then(function (response) {
        const tasks = response.data;
        printTask(tasks);
    })
.catch(function (error){
        console.log(error);
       })

}

// Con esta funcion Creamos las tareas 
function createTask (){
    const newProduct = {
       name: "Nuevo Producto",
       price: 12345,
       image: "https://www.academlo.com/img/home/estudiando-programacion-min.png"
      
        
    }
    axios.post('https://e-commerce-api-academlo.herokuapp.com/api/products', newProduct)
    .then(function (response) {
         alert('Tu producto se subio correctamente');
        console.log(response);
        getTask()
         })
.catch(function (error){
        alert('Tu producto no pudo ser creado')
        console.log(error);
       })
    
}

function deleteProduct(id){
const confirmation = confirm("¿Estas seguro de que deseas eliminar este producto?")
if (!confirmation) {
    return
}
axios.delete(`${baseUrl}/products/${id}`)
    .then(function () {
        alert('Eliminaste el producto');
        getTask()
        
         })
.catch(function (error){
        alert('Tu producto no pudo ser eliminado')
        console.log(error);
       })

}

function editProduct(id){
    axios.get(`${baseUrl}/products/${id}`)
    .then(function (response) {
        const product = response.data;
        editingId = id;
        document.getElementById('name').value = product.name
        document.getElementById('price').value = product.price
        document.getElementById('image').value = product.image
     
        
         })
.catch(function (error){
        alert('No se pudo cargar el producto')
        console.log(error);
       })
  
}

function updateInformation() {
    alert('se edito la tarea')
    const productEdited = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        image: document.getElementById('image').value
       
         
     }
     axios.put(`${baseUrl}/products/${editingId}`, productEdited)
     .then(function (response) {
          alert('La informacion se edito correctamente');
         console.log(response);
         getTask()
          })
 .catch(function (error){
         alert('Tu producto no pudo ser editado')
         console.log(error);
        })
    
}


getTask();