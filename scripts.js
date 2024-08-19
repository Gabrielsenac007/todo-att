const button = document.querySelector('.addButton');
const input = document.querySelector('.inputList')
const completeList = document.querySelector('.listTasks')
const finishedList = document.querySelector('.finishedTasks')

let itemsList = []


function addingTask(){

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
                    <p>${fields.task}</p> 
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
    if(input ==='') {
        input.classList.add('error')
    }
}

button.addEventListener('click', addingTask)