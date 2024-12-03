// Function to load and render data from localStorage
function renderData() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; 
  
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.setAttribute('data-index', index);
  
      
      if (todo.done) {
        li.classList.add('done');
      }
  
      const span = document.createElement('span');
      span.textContent = todo.text;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-btn');
      editButton.onclick = () => startEdit(index);
  
   
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      deleteButton.onclick = () => deleteItem(index);
  
   
      const doneButton = document.createElement('button');
      doneButton.textContent = todo.done ? 'Undo' : 'Done';
      doneButton.classList.add('done-btn');
      doneButton.onclick = () => toggleDone(index);
  
      li.appendChild(span);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      li.appendChild(doneButton);
  
      todoList.appendChild(li);
    });
  }
  
  
  function addItem() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
  
    if (!todoText) return; 
  
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todoText, done: false });
    localStorage.setItem('todos', JSON.stringify(todos));
  
    input.value = ''; 
    renderData(); 
  }
  

  function startEdit(index) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todo = todos[index];
  
    const newText = prompt('Edit your task:', todo.text);
    if (newText === null || newText === '') return; 
  
    todos[index].text = newText;
    localStorage.setItem('todos', JSON.stringify(todos));
  
    renderData(); 
  }
  
  function deleteItem(index) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  
    renderData(); 
  }
  
  
  function toggleDone(index) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos[index].done = !todos[index].done;
    localStorage.setItem('todos', JSON.stringify(todos));
  
    renderData(); 
  }
  
  
  window.onload = renderData;
  