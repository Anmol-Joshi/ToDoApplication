document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  let editingIndex = null; // Variable to keep track of the item being edited

  // Add event listener to the "Add" button
  addBtn.addEventListener('click', () => {
    if (editingIndex !== null) {
      updateTodo();
    } else {
      addTodo();
    }
  });

  // Add event listener for "Enter" key
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      if (editingIndex !== null) {
        updateTodo();
      } else {
        addTodo();
      }
    }
  });

  // Function to add a new task
  function addTodo() {
    const todoText = input.value.trim();
    if (todoText === '') return;

    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <div id="toDoText">
      <span>${todoText}
      </div>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
      </span>
    `;

    // Complete a task by clicking on the text
    listItem.querySelector('span').addEventListener('click', () => {
      listItem.classList.toggle('completed');
    });

    // Edit a task
    listItem.querySelector('.edit').addEventListener('click', () => {
      input.value = listItem.querySelector('span').innerText;
      editingIndex = Array.from(todoList.children).indexOf(listItem);
      addBtn.textContent = 'Update';
    });

    // Delete a task
    listItem.querySelector('.delete').addEventListener('click', () => {
      todoList.removeChild(listItem);
      resetForm();
    });

    todoList.appendChild(listItem);
    resetForm();
  }

  // Function to update an existing task
  function updateTodo() {
    const todoText = input.value.trim();
    if (todoText === '') return;

    const listItem = todoList.children[editingIndex];
    listItem.querySelector('span').innerText = todoText;

    resetForm();
  }

  // Reset the form after adding/updating a task
  function resetForm() {
    input.value = '';
    addBtn.textContent = 'Add';
    editingIndex = null;
  }
});
