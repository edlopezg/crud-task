


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
        
         
          </div>
          </div>
          </div>
                    `
       
   }
   // imprimir el HTML
  container.innerHTML = html;
}



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
         })
.catch(function (error){
        alert('Tu producto no pudo ser creado')
        console.log(error);
       })
    
}
getTask();