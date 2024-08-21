const button = document.querySelector('.addButton');
const input = document.querySelector('.inputList')
const completeList = document.querySelector('.listTasks')
const finishedList = document.querySelector('.finishedTasks')
const error = document.querySelector('.error')

let itemsList = []


function addingTask(){

    if(!validateInput()){

        return;
    }

    itemsList.push({
        task: input.value,
        status: false
    })

    input.value = ''
    showTasks();

}




function showTasks(){

    let todoTasks = ''
    let finishedTasks = ''

    itemsList.forEach((fields, index) =>{
        if(fields.status){

            finishedTasks += `
                    <li class="task">
                    <p class="${taskComplete && "done"}">${fields.task}</p> 
                    <i class="bi bi-trash" style="color:red; cursor: pointer;" onclick="deleteItem(${index})"></i> 
                    </li>
            `
        }else {
            todoTasks += `
            <li class="task">
            <i class="bi bi-check-circle" style="color:#54B37A;" onclick="taskComplete(${index})" ></i>
            <p>${fields.task}</p> 
            <i class="bi bi-trash" style="color:red; cursor: pointer;" onclick="deleteItem(${index})"></i> 
            </li>
    `
        }

    })

    completeList.innerHTML = todoTasks;
    finishedList.innerHTML = finishedTasks;

    const finishedTitle = document.querySelector('.finishedTitle');
    finishedTitle.style.display = finishedTasks.trim() === '' ? 'none' : 'block';

    const loading = document.querySelector('.loading');
    loading.style.display = todoTasks.length < 1 ? 'block' : 'none'

    localStorage.setItem('List', JSON.stringify(itemsList))
}

function taskComplete(index){
    itemsList[index].status = !itemsList[index].status
    showTasks()
}

function deleteItem(index) {
    itemsList.splice(index, 1 )

    showTasks()
}

function validateInput(){
    if(input.value.trim() ==='') {
        input.classList.add('inputList-error')
        error.textContent = 'O campo de tarefa não pode estar vazio!'
        error.classList.add('error-message')
        return false
    }else if(input.value.length < 3){
        input.classList.add('inputList-error')
        error.textContent = 'Mínimo de 3 caracteres!'
        error.classList.add('error-message')
        return false
    }else{
        return true
    }
}

input.addEventListener('input', ()=>{
    if(input.value.trim() != ''){
        input.classList.remove('inputList-error')
        error.classList.remove('error-message')
    }
})

function loadTasks() {
    const tasksLocalStorage = localStorage.getItem('List')
    if(tasksLocalStorage){

        itemsList = JSON.parse(tasksLocalStorage)
    }
    showTasks()
}
loadTasks()

button.addEventListener('click', addingTask)