document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const selectAllBtn = document.getElementById("selectAllBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    selectAllBtn.addEventListener("click", function() {
        const checkboxes = document.querySelectorAll(".task input[type='checkbox']");
        const checkedCheckboxes = document.querySelectorAll(".task input[type='checkbox']:checked");
        checkboxes.forEach(checkbox => {
            checkbox.checked = checkedCheckboxes.length !== checkboxes.length;
        });
        toggleDeleteBtn();
        toggleSelectAllBtn();
    });

    deleteBtn.addEventListener("click", function() {
        const checkedCheckboxes = document.querySelectorAll(".task input[type='checkbox']:checked");
        checkedCheckboxes.forEach(checkbox => {
            checkbox.parentElement.remove();
        });
        toggleDeleteBtn();
        toggleSelectAllBtn();
    });

    taskList.addEventListener("change", function() {
        toggleDeleteBtn();
        toggleSelectAllBtn();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const taskTextElement = document.createElement("p");
            taskTextElement.textContent = taskText;

            const updateBtn = document.createElement("button");
            updateBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            updateBtn.classList.add("update-btn");
            updateBtn.addEventListener("click", function() {
                const newText = prompt("Update the task:", taskText);
                if (newText !== null) {
                    taskTextElement.textContent = newText.trim();
                }
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskTextElement);
            taskItem.appendChild(updateBtn);

            taskList.appendChild(taskItem);
            toggleSelectAllBtn();
            taskInput.value = "";
        }
    }

    function toggleDeleteBtn() {
        const taskItems = document.querySelectorAll(".task");
        const checkedCheckboxes = document.querySelectorAll(".task input[type='checkbox']:checked");
        if (checkedCheckboxes.length > 0) {
            deleteBtn.style.display = "inline-block";
        } else {
            deleteBtn.style.display = "none";
        }
    }

    function toggleSelectAllBtn() {
        const checkboxes = document.querySelectorAll(".task input[type='checkbox']");
        const checkedCheckboxes = document.querySelectorAll(".task input[type='checkbox']:checked");
        if (checkedCheckboxes.length === checkboxes.length && checkboxes.length > 0) {
            selectAllBtn.textContent = "Deselect All";
        } else {
            selectAllBtn.textContent = "Select All";
        }
        selectAllBtn.style.display = checkboxes.length > 0 ? "inline-block" : "none";
    }
});