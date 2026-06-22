document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector("section");
    signupForm.style.opacity=0;
    setTimeout(() => {
        signupForm.style.transition = "opacity 1s ease-in-out";
        signupForm.style.opacity = 1;
    }, 500);
}); 


document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("input[name='username']").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;

    try {
        const response = await fetch("http://localhost:8080/api/student/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        if (response.ok) {
            alert("Student registered successfully!");
            window.location.href = "login.html";
        } else {
            const error = await response.text();
            alert("Error: " + error);
        }

    } catch (err) {
        console.error(err);
        alert("Cannot connect to server");
    }
});