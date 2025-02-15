// Asignar eventos a los botones de editar y eliminar
function assignEditEvents() {
  // Botones de Editar
  for (let el of document.getElementsByClassName('edit_button')) {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const teacherId = e.target.id;
  
      // Solicitar nuevos datos al usuario para la actualización
      const newFirstName = prompt("Ingrese el nuevo nombre (deje vacío para no cambiar):");
      const newLastName = prompt("Ingrese el nuevo apellido (deje vacío para no cambiar):");
      const newCedula = prompt("Ingrese la nueva cédula (deje vacío para no cambiar):");
      const newAge = prompt("Ingrese la nueva edad (deje vacío para no cambiar):");
  
      const updates = {};
      if (newFirstName) updates.first_name = newFirstName;
      if (newLastName) updates.last_name = newLastName;
      if (newCedula) updates.cedula = newCedula;
      if (newAge) updates.age = newAge;
  
      if (Object.keys(updates).length > 0) {
        // Realizar la solicitud PATCH
        const response = await fetch(`http://localhost:3000/teachers?id=${teacherId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updates)
        });
  
        if (response.ok) {
          alert("Datos actualizados correctamente.");
          getTeachers(); // Refrescar la lista de maestros
        } else {
          alert("Error al actualizar el maestro.");
        }
      } else {
        alert("No se ingresaron cambios.");
      }
    });
  }

  // Botones de Eliminar
  for (let el of document.getElementsByClassName('delete_button')) {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const teacherId = e.target.id;

      if (confirm("¿Está seguro de que desea eliminar este maestro?")) {
        // Realizar la solicitud DELETE
        const response = await fetch(`http://localhost:3000/teachers?id=${teacherId}`, {
          method: "DELETE"
        });

        if (response.ok) {
          alert("Maestro eliminado correctamente.");
          getTeachers(); // Refrescar la lista
        } else {
          alert("Error al eliminar el maestro.");
        }
      }
    });
  }
}

// Obtener la lista de maestros (GET)
async function getTeachers() {
  const response = await fetch("http://localhost:3000/teachers");
  const teachers = await response.json();
  console.log('teachers:', teachers);

  if (teachers) {
    const container = document.getElementById('result');
    container.innerHTML = '';
    
    // Para cada maestro, se agrega un card con sus detalles (sin imagen)
    teachers.forEach(element => {
      const item = document.createElement('div');
      item.classList.add('card', 'mb-3');
      item.style = "max-width: 540px;";
      item.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${element.first_name} ${element.last_name}</h5>
          <p class="card-text"><strong>Cédula:</strong> ${element.cedula}</p>
          <p class="card-text"><strong>Edad:</strong> ${element.age}</p>
          <a href="#" class="btn btn-warning edit_button" id="${element._id}">Editar</a>
          <a href="#" class="btn btn-danger delete_button" id="${element._id}">Eliminar</a>
        </div>
      `;
      container.appendChild(item);
    });

    assignEditEvents();
  }
}

// Crear un maestro nuevo (POST)
async function createTeacher() {
  const teacher = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    cedula: document.getElementById('cedula').value,
    age: document.getElementById('age').value
  };

  const response = await fetch("http://localhost:3000/teachers", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teacher)
  });

  if (response && response.status == 201) {
    const newTeacher = await response.json();
    console.log('Teacher saved', newTeacher);
    alert('Usuario guardado');
    getTeachers(); // Refrescar la lista
  } else {
    alert("Error al guardar el maestro.");
  }
}

// Inicializar la lista de maestros al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  getTeachers();
});



