const root = document.getElementById("root");
//  ____________________________________________________________
function TodoForm(add) {
  const container = document.createElement("form");

  container.innerHTML = `
    <input type="text"/>
    <input type="submit" value="Add" class="btn">
  `;

  container.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = container.querySelector("input").value;
    add(value)
  });

  return container;
}
// ______________________________________________________________
function ListItem(todo, onChange) {
  const container = document.createElement("div");

  container.innerHTML = `
  <label>
      <input type="checkbox" ${todo.completed ? "checked" : ""}/>
      ${todo.label}
    </label>
  `;

  const input = container.querySelector("input");
  input.addEventListener("change", (e) => {
    onChange(e.target.checked);
  })
  return container;
}

// _______________________________________________________________
function List(todos, onChange) {
  const container = document.createElement("div");

  todos.map(todo => {
    return ListItem(todo, (change) => {
      todo.completed = change;
      onChange();
    });
  }).forEach(el => {
    container.appendChild(el);
  })

  return container;
}
// ________________________________________________________________
function TodoFooter(todos, onChange) {
  const container = document.createElement("div");

  const completed = todos.filter(todo => todo.completed === true).length
  container.innerHTML = `
    <span>${completed} / ${todos.length} Completed</span>
    <button>Clear Completed</button>
  `;

  const btn = container.querySelector("button");
  btn.addEventListener("click", () => {
    onChange(todos.filter(todo => todo.completed === false));
  });

  return container;
}

// __________________________________________________________________
function App() {

  let todos = [
    { label: "learn JS", completed: false },
    { label: "learn Node", completed: false },
    { label: "learn CSS", completed: false }
  ]

  const container = document.createElement("div");

  function render() {
    container.innerHTML = ""
    container.appendChild(TodoForm(function (newText) {
      todos.push({
        label: newText,
        completed: false
      });
      render();
    }));
    container.appendChild(List(todos, () => {
      render();
    }));
    container.appendChild(TodoFooter(todos, (newTodos) => {
      todos = newTodos
      render();
    }));
    
  };
  render();

  return container;
}

root.appendChild(App())