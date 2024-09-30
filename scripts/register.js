const form = document.getElementById('registerForm');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// Função para alternar a visibilidade da senha
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('bi-eye'); // Alterna o ícone de olho
    this.classList.toggle('bi-eye-slash'); // Alterna o ícone de olho cortado
});

// Adiciona um listener ao evento de envio do formulário
form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Previne o envio do formulário padrão

    // Coleta os dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validação simples
    if (!name || !email || !password) {
        showErrorMessage('Preencha todos os campos!'); // Exibe mensagem de erro
        return; // Sai da função se houver campos vazios
    }

    // Envio dos dados para o servidor
    try {
        const response = await fetch('http://localhost:3000/api/auth/userRegister', { // Altere para a rota do seu servidor
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: name, email, password })
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            showErrorMessage(errorMessage.message); // Mostra mensagem de erro
            return;
        }

        const data = await response.json();
        alert('Usuário cadastrado com sucesso!'); // Mensagem de sucesso

    } catch (error) {
        showErrorMessage('Erro ao registrar. Tente novamente mais tarde.'); // Mensagem de erro
    }
});

// Função para mostrar mensagens de erro
function showErrorMessage(message) {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = message;
        msg.style.color = 'red'; // Estilo para a mensagem de erro
    });
}
