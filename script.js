let id = 0;
let height = 0; // no máximo 8 captar a altura de cada div, somar à variavel a cada adição e condicionar a adição até a soma igualar a altura total de tasks


const tarefa = (id) => ` <div id="${id}">
                            <input type="checkbox" />
                            <p>Tarefa</p>
                            <p>xx/xx</p>
                            <img onclick="removeTask(id)" src="./img/trash_icon.svg" alt="">                            
                        </div>` 

function addTask() {
    id++;
    height++;
    console.log(height)
    if (height <= 8) {
        document.querySelector('#tasks').innerHTML += tarefa(id);
    }
}

function removeTask(id) {
    //deletar tarefa o clicar na imagem
    console.log(tarefa.id);
    
    //descobrir como "pegar" da task em questão
}