document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("section");
    loginForm.style.opacity=0;
    setTimeout(() => {
        loginForm.style.transition = "opacity 1s ease-in-out";
        loginForm.style.opacity = 1;
    }, 500);
}); 

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    
    try {
        const response = await fetch("http://localhost:8080/api/student/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            const error = await response.text();
            alert("Error: " + error);
        }

    } catch (err) {
        console.error(err);
        alert("Cannot connect to server");
    }
});

// Store student ID in local storage after successful login
localStorage.setItem(
    "id",
    student.id
);
