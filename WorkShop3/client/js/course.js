document.addEventListener("DOMContentLoaded", () => {
    getCourse();
    loadTeachers();

    document.getElementById("courseForm").addEventListener("submit", saveCourse);
});

// Cargar cursos desde la API
function getCourse() {
    fetch("http://localhost:3000/course")
        .then(response => response.json())
        .then(data => {
            let result = document.getElementById("result");
            result.innerHTML = "";

            data.forEach(course => {
                result.innerHTML += `
                    <div class="card mt-3">
                        <div class="card-body">
                            <h5 class="card-title">${course.name} (${course.code})</h5>
                            <p class="card-text">${course.description}</p>
                            <p class="card-text"><strong>Profesor:</strong> ${course.teacher.first_name} ${course.teacher.last_name}</p>
                            <button class="btn btn-warning" onclick="editCourse('${course._id}')">Editar</button>
                            <button class="btn btn-danger" onclick="deleteCourse('${course._id}')">Eliminar</button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error("Error cargando cursos:", error));
}

// Cargar profesores en el select
function loadTeachers() {
    console.log("Cargando profesores...");
    fetch("http://localhost:3000/teachers")
        .then(response => response.json())
        .then(data => {
            console.log("Maestros obtenidos:", data);

            let teacherSelect = document.getElementById("teacher");
            teacherSelect.innerHTML = '<option value="">Seleccione un maestro</option>';

            data.forEach(teacher => {
                teacherSelect.innerHTML += `<option value="${teacher._id}">
                    ${teacher.first_name} ${teacher.last_name}
                </option>`;
            });
        })
        .catch(error => {
            console.error("Error cargando maestros:", error);
            alert("Hubo un error al cargar los maestros.");
        });
}

// Guardar o editar curso
function saveCourse(event) {
    event.preventDefault();

    const courseId = document.getElementById("courseId").value;
    const name = document.getElementById("name").value;
    const code = document.getElementById("code").value;
    const description = document.getElementById("description").value;
    const teacher = document.getElementById("teacher").value;

    const courseData = { name, code, description, teacher };

    // Determinamos si es creación o edición en base al courseId
    const method = courseId ? "PATCH" : "POST";
    const url = courseId 
                ? `http://localhost:3000/course?id=${courseId}` 
                : "http://localhost:3000/course";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
    })
    .then(response => response.json())
    .then(() => {
        // Reiniciamos el formulario y recargamos los cursos
        document.getElementById("courseForm").reset();
        document.getElementById("courseId").value = "";
        getCourse();
    })
    .catch(error => console.error("Error guardando curso:", error));
}

// Cargar datos en el formulario para editar
function editCourse(id) {
    const url = `http://localhost:3000/course?id=${id}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP ${response.status}: ${text}`);
                });
            }
            return response.json();
        })
        .then(course => {
            console.log("Curso obtenido:", course);
            document.getElementById("courseId").value = course._id;
            document.getElementById("name").value = course.name;
            document.getElementById("code").value = course.code;
            document.getElementById("description").value = course.description;
            document.getElementById("teacher").value = course.teacher ? course.teacher._id : "";
        })
        .catch(error => console.error("Error cargando curso:", error));
}



// Eliminar curso
async function deleteCourse(courseId) {
    if (!confirm("¿Está seguro de que desea eliminar este curso?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/course?id=${courseId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        // Si la respuesta es vacía, no intentes hacer .json()
        if (response.status === 204) {
            console.log("Curso eliminado correctamente.");
        } else {
            await response.json();
        }

        alert("Curso eliminado correctamente.");
        getCourse(); // Recargar lista de cursos
    } catch (error) {
        console.error("Error eliminando curso:", error);
        alert("Error al eliminar el curso.");
    }
}

