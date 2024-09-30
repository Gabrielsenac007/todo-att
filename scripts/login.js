// Função para alternar a visibilidade da senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("bi-eye-slash");
        toggleIcon.classList.add("bi-eye");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("bi-eye");
        toggleIcon.classList.add("bi-eye-slash");
    }
}


document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const errorMessageEmail = document.querySelector("#email + small.error-message");
    const errorMessagePassword = document.querySelector("#password + small.error-message");

    if (errorMessageEmail) {
        errorMessageEmail.textContent = "";
    }
    if (errorMessagePassword) {
        errorMessagePassword.textContent = "";
    }

    let valid = true;

    if (!email) {
        if (errorMessageEmail) {
            errorMessageEmail.textContent = "O email é obrigatório.";
        }
        valid = false;
    }

    if (!password) {
        if (errorMessagePassword) {
            errorMessagePassword.textContent = "A senha é obrigatória.";
        }
        valid = false;
    }

    if (valid) {
        try {
            const response = await fetch('http://localhost:3000/api/auth/userLogin', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login.'); 
            }

            const data = await response.json();
            console.log('Login realizado com sucesso!', data);


            localStorage.setItem('token', data.token);


            window.location.href = "/todo.html";

        } catch (error) {
            console.error(error);
            if (errorMessagePassword) {
                errorMessagePassword.textContent = "Houve um erro ao tentar fazer login. Tente novamente.";
            }
        }
    }
});