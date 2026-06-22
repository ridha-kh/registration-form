

   // ***DASHBOARD.JS***

   // welcome message

   const name = localStorage.getItem("name");

document.getElementById("welcome").textContent =
    `Welcome ${name}`;

// Function to load students from the API and display them in a table
async function loadStudents() {

    const response =
        await fetch("http://localhost:8080/api/student");

    const students =
        await response.json();

    let html = `
        <div class="table-container">
            <h2>Students</h2>

            <table class="glass-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
    `;

    students.forEach(student => {
        html += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    document.getElementById("content").innerHTML = html;
}
// Function to show the update form
function showUpdateForm() {

    document.getElementById("content").innerHTML = `

        <h2>Update Profile</h2>

        <form id="updateForm">

            <input
                type="number"
                id="id"
                placeholder="ID"
                required>

            <input
                type="text"
                id="name"
                placeholder="Name">

            <input
                type="email"
                id="email"
                placeholder="Email">

            <input
                type="password"
                id="password"
                placeholder="Password">

            <button type="submit">
                Update
            </button>

        </form>
    `;

    document
        .getElementById("updateForm")
        .addEventListener(
            "submit",
            updateStudent
        );
}

// Function to update student information
async function updateStudent(e) {

    e.preventDefault();

    const student = {

        id:
            document.getElementById("id").value,

        name:
            document.getElementById("name").value,

        email:
            document.getElementById("email").value,

        password:
            document.getElementById("password").value
    };

    const response = await fetch(
        "http://localhost:8080/api/student/update",
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(student)
        }
    );

    if(response.ok){

        alert("Updated successfully");

    }else{

        alert("Update failed");
    }
}

// Function to delete a student by ID
async function deleteStudent() {
    
    const id = document.getElementById("id").value;
    if(!id) {
        alert("Please enter an ID");
        return;
    }

    const response =
        await fetch(
            `http://localhost:8080/api/student/${id}`,
            {
                method: "DELETE"
            }
        );

    if(response.ok){

        alert("Deleted successfully");

    }else{

        alert("Delete failed");
    }
}   

// Function to delete the logged-in student's account
async function deleteAccount() {

    const id = localStorage.getItem("id");

    if(!id) {
        alert("No student ID found in local storage.");
        return;
    }

    const response =
        await fetch(
            `http://localhost:8080/api/student/${id}`,
            {
                method: "DELETE"
            }
        );

    if(response.ok){

        alert("Account deleted");
        localStorage.removeItem("id");
        window.location.href = "login.html";

    }else{

        alert("Delete failed");
    }
}

// Function to log out the user
function logout() {

    localStorage.removeItem("id");
    window.location.href = "login.html";
}   


