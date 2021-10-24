let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

let selectDisplayCountEl = document.getElementById("selectDisplayCount");

function createResultItem(result) {


    let {

        title,

        imageLink,

        author

    } = result;

    let bookEl = document.createElement("div");
    bookEl.classList.add("col-6", "text-center");
    searchResultsEl.appendChild(bookEl);
    let bookImageEl = document.createElement("img");
    bookImageEl.src = imageLink;
    bookImageEl.classList.add("book-image-size", "w-100");
    bookEl.appendChild(bookImageEl);
    let bookAuthorEl = document.createElement("p");

    bookAuthorEl.textContent = author;

    bookAuthorEl.classList.add("book-author-para", "pt-2");

    bookEl.appendChild(bookAuthorEl);


}

let selectedOption;

selectDisplayCountEl.addEventListener("change", function(event) {
    selectedOption = event.target.value;
    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";
    getExpextedResults();
});

function getExpextedResults() {
    let options = {
        method: "GET"
    };
    let searchInputText = searchInputEl.value;
    if (searchInputText === "") {
        spinnerEl.classList.add("d-none");
        searchResultsEl.textContent = "";
    } else {
        let paragraphEl = document.createElement("h1");
        paragraphEl.classList.add("popular-books", "col-12", "p-3");
        paragraphEl.textContent = "Popular Books";
        searchResultsEl.appendChild(paragraphEl);

        let url = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value + "&maxResults=" + selectDisplayCountEl.value;

        fetch(url, options)

            .then(function(response) {

                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                for (let result of search_results) {
                    spinnerEl.classList.add("d-none");
                    createResultItem(result);
                }
            });
    }
}

function createSingleResultItem(search_results) {
    searchResultsEl.textContent = "";
    let paragraphEl = document.createElement("h1");
    paragraphEl.classList.add("popular-books", "col-12", "p-3");
    paragraphEl.textContent = "Popular Books";
    searchResultsEl.appendChild(paragraphEl);
    for (let result of search_results) {
        createResultItem(result);
    }
}

function allSearchInputs(event) {
    if (event.key === "Enter") {
        let searchInputText = searchInputEl.value;
        if (searchInputText === "") {
            spinnerEl.classList.add("d-none");
            searchResultsEl.textContent = "";
        } else {
            spinnerEl.classList.remove("d-none");
            let searchInputVal = searchInputEl.value;
            let url = "https://apis.ccbp.in/book-store?title=" + searchInputVal + "&maxResults=" + selectDisplayCountEl.value;
            let options = {
                method: "GET"
            };
            fetch(url, options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonData) {
                    spinnerEl.classList.add("d-none");
                    let {
                        search_results
                    } = jsonData;
                    if (search_results.length === 0) {
                        searchResultsEl.textContent = "";
                        let paragraphEl = document.createElement("h1");
                        paragraphEl.classList.add("popular-books", "col-12", "p-3", "text-center");
                        paragraphEl.textContent = "No results found";
                        searchResultsEl.appendChild(paragraphEl);
                    } else {
                        createSingleResultItem(search_results);
                    }
                });
        }
    }
}
searchInputEl.addEventListener("keydown", allSearchInputs);


let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container1");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("button");
    deleteIcon.textContent = "Delete";
    deleteIcon.classList.add("delete-icon1");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}