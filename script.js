// Small vanilla JavaScript interactions used in the Day 4 and Day 5 exercises.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
  }

  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const errors = {
        name: name.length >= 2 ? "" : "Enter at least 2 characters.",
        email: emailValid ? "" : "Enter a valid email address.",
        message: message.length >= 10 ? "" : "Message must contain at least 10 characters."
      };
      Object.entries(errors).forEach(([key, value]) => {
        const output = form.querySelector(`[data-error="${key}"]`);
        if (output) output.textContent = value;
        form.elements[key].setAttribute("aria-invalid", String(Boolean(value)));
      });
      const status = form.querySelector(".status");
      if (Object.values(errors).some(Boolean)) {
        status.textContent = "Please correct the highlighted fields.";
      } else {
        status.textContent = "Form validated successfully. This demo does not send or store messages.";
        form.reset();
      }
    });
  }

  const display = document.querySelector("#calc-display");
  if (display) {
    let expression = "";
    const render = () => { display.value = expression || "0"; };
    document.querySelectorAll("[data-calc]").forEach(button => {
      button.addEventListener("click", () => {
        const value = button.dataset.calc;
        if (value === "clear") expression = "";
        else if (value === "back") expression = expression.slice(0, -1);
        else if (value === "equals") {
          if (!expression || !/^[0-9+*/().%\s-]+$/.test(expression)) {
            expression = "Error";
          } else {
            try {
              const result = Function(`"use strict"; return (${expression})`)();
              expression = Number.isFinite(result) ? String(Number(result.toFixed(8))) : "Error";
            } catch { expression = "Error"; }
          }
        } else {
          if (expression === "Error") expression = "";
          expression += value;
        }
        render();
      });
    });
  }

  const todoForm = document.querySelector("#todo-form");
  const todoList = document.querySelector("#todo-list");
  if (todoForm && todoList) {
    const storageKey = "front-end-course-todos";
    let tasks = [];
    try { tasks = JSON.parse(localStorage.getItem(storageKey) || "[]"); }
    catch { tasks = []; }
    const save = () => localStorage.setItem(storageKey, JSON.stringify(tasks));
    const render = () => {
      todoList.replaceChildren();
      if (!tasks.length) {
        const empty = document.createElement("li");
        empty.className = "muted";
        empty.textContent = "No tasks yet. Add your first task above.";
        todoList.append(empty);
      }
      tasks.forEach(task => {
        const item = document.createElement("li");
        item.className = `todo-item${task.done ? " done" : ""}`;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.setAttribute("aria-label", `Mark ${task.text} as complete`);
        checkbox.addEventListener("change", () => {
          task.done = checkbox.checked; save(); render();
        });
        const label = document.createElement("span");
        label.textContent = task.text;
        const remove = document.createElement("button");
        remove.className = "small-button";
        remove.type = "button";
        remove.textContent = "Delete";
        remove.addEventListener("click", () => {
          tasks = tasks.filter(entry => entry.id !== task.id); save(); render();
        });
        item.append(checkbox, label, remove);
        todoList.append(item);
      });
    };
    todoForm.addEventListener("submit", event => {
      event.preventDefault();
      const input = todoForm.elements.task;
      const text = input.value.trim();
      if (!text) return;
      tasks.push({id: Date.now(), text, done: false});
      input.value = ""; save(); render(); input.focus();
    });
    render();
  }
});
