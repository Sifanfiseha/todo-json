const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + `?_limit=10`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => {
        addTodoToDOM(todo);
      });
    });
};
const addTodoToDOM = (todo) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(todo.title));
  div.classList.add("todo");
  div.setAttribute("data-id", todo.id);
  if (todo.completed) {
    div.classList.add("done");
  }
  document.querySelector("#todo-list").appendChild(div);
};
const createTodo = (e) => {
  e.preventDefault();
  const inputValue = e.target.querySelector("input").value;
  const newTodo = {
    title: inputValue,
    completed: false,
  };
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      addTodoToDOM(data);
    })
    .catch((error) => {
      console.error("Error adding todo:", error);
    });
};
const toggleComplete = (e) => {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");
    updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
  }
};
const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-type": "application/json",
    },
  });
};
const deletTodo = (e) => {
  if (e.target.classList.contains("todo")) {
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
};
const init = () => {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.querySelector("#todo-form").addEventListener("submit", createTodo);
  document
    .querySelector("#todo-list")
    .addEventListener("click", toggleComplete);
  document.querySelector("#todo-list").addEventListener("dblclick", deletTodo);
};
init();
