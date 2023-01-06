const arr = []
const listE1 = document.getElementsByClassName('list')[0]
const submitItem = document.getElementById('input')

const refreshList = function () {
    listE1.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        let toDoItem = document.createElement('li')
        toDoItem.setAttribute('class', 'list-item')
        toDoItem.innerText = arr[i]
        toDoItem.innerHTML += `<span class="deleteItem">&#10008;</span>`
        toDoItem.innerHTML += `<span class="editItem">&#9997;</span>`
        listE1.insertAdjacentElement('beforeend', toDoItem)
    }
    addEventListeners()
}

submitItem.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && e.target.value != "") {
        const val = e.target.value
        e.target.value = "";
        arr.push(val);
        refreshList()
    }
})

refreshList()

function editItem(toDoItem, toEdit) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === toDoItem) {
            arr[i] = toEdit;
            return;
        }
    }
}

function addEventListeners() {
    const deleteItemEls = Array.from(document.getElementsByClassName('deleteItem'))
    const editItemEls = Array.from(document.getElementsByClassName('editItem'));
    for (let i = 0; i < deleteItemEls.length; i++) {
        deleteItemEls[i].addEventListener('click', (e) => {
            const item = e.target.parentNode.innerText
            const toDoItem = item.slice(0, -3).trim()
            arr.splice(arr.indexOf(toDoItem), 1)
            refreshList()
        })
        editItemEls[i].addEventListener('click', (e) => {
            const item = e.target.parentNode.innerText;
            const toDoItem = item.slice(0, -3).trim();
            const val = submitItem.value;
            if (val === "") {
                alert("Enter the value in Input Box")
                return;
            }
            editItem(toDoItem, val)
            submitItem.value = ""
            refreshList()
        })
    }
}