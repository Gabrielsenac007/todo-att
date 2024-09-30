const button = document.querySelector('.addButton');
const input = document.querySelector('.inputList');
const completeList = document.querySelector('.listTasks');
const finishedList = document.querySelector('.finishedTasks');
const error = document.querySelector('.error');

let itemsList = [];

function addingTask() {
    if (!validateInput()) {
        return;
    }

    const taskData = {
        nameTask: input.value
    };

    fetch('http://localhost:3000/api/task/createTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        itemsList.push(data);
        input.value = '';
        showTasks();
    })
    .catch(err => {
        console.error('Erro ao adicionar tarefa:', err);
    });
}

function showTasks() {
    let todoTasks = '';
    let finishedTasks = '';

    itemsList.forEach((fields) => {
        if (fields.status) {
            finishedTasks += `
                <li class="task">
                    <p class="done">${fields.nameTask}</p> 
                    <i class="bi bi-trash" style="color:red; cursor: pointer;" onclick="deleteItem('${fields._id}')"></i> 
                </li>
            `;
        } else {
            todoTasks += `
                <li class="task">
                    <i class="bi bi-check-circle" style="color:#54B37A;" onclick="toggleTaskStatus('${fields._id}')"></i>
                    <p class="text-task">${fields.nameTask}</p> 
                    <i class="bi bi-trash" style="color:red; cursor: pointer;" onclick="deleteItem('${fields._id}')"></i> 
                </li>
            `;
        }
    });

    completeList.innerHTML = todoTasks;
    finishedList.innerHTML = finishedTasks;

    const finishedTitle = document.querySelector('.finishedTitle');
    finishedTitle.style.display = finishedTasks.trim() === '' ? 'none' : 'block';

    const loading = document.querySelector('.loading');
    loading.style.display = todoTasks.length < 1 ? 'block' : 'none';
}

function toggleTaskStatus(taskId) {
    fetch(`http://localhost:3000/api/task/toggleTaskStatus/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(updatedTask => {
        const index = itemsList.findIndex(task => task._id === updatedTask._id);
        itemsList[index] = updatedTask; 
        showTasks();
    })
    .catch(err => {
        console.error('Erro ao alternar status da tarefa:', err);
    });
}

function deleteItem(taskId) {
    fetch(`http://localhost:3000/api/task/deleteTask/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        itemsList = itemsList.filter(task => task._id !== taskId);
        showTasks();
    })
    .catch(err => {
        console.error('Erro ao deletar tarefa:', err);
    });
}

function validateInput() {
    if (input.value.trim() === '') {
        input.classList.add('inputList-error');
        error.textContent = 'O campo de tarefa não pode estar vazio!';
        error.classList.add('error-message');
        return false;
    } else if (input.value.length < 3) {
        input.classList.add('inputList-error');
        error.textContent = 'Mínimo de 3 caracteres!';
        error.classList.add('error-message');
        return false;
    } else {
        return true;
    }
}

input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
        input.classList.remove('inputList-error');
        error.classList.remove('error-message');
    }
});

function loadTasks() {
    fetch('http://localhost:3000/api/task/userTasks', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        itemsList = data;
        showTasks();
    })
    .catch(err => {
        console.error('Erro ao carregar tarefas:', err);
    });
}

loadTasks();
button.addEventListener('click', addingTask);
