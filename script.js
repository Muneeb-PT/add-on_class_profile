// Shared JavaScript interactions for the five-day front-end training exercises.
document.addEventListener("DOMContentLoaded", () => {
  // Day 3: responsive navigation.
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Day 4: client-side form validation.
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const errors = {
        name: form.elements.name.value.trim().length >= 2 ? "" : "Enter at least 2 characters.",
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements.email.value.trim()) ? "" : "Enter a valid email address.",
        message: form.elements.message.value.trim().length >= 10 ? "" : "Message must contain at least 10 characters."
      };
      Object.entries(errors).forEach(([key, message]) => {
        const input = form.elements[key];
        const output = form.querySelector(`[data-error="${key}"]`);
        if (output) output.textContent = message;
        input.setAttribute("aria-invalid", String(Boolean(message)));
      });
      const status = form.querySelector(".status");
      const firstInvalid = Object.keys(errors).find(key => errors[key]);
      if (firstInvalid) {
        status.textContent = "Please correct the highlighted fields.";
        form.elements[firstInvalid].focus();
      } else {
        status.textContent = "Form validated successfully. This demo does not send or store messages.";
        form.reset();
        Object.keys(errors).forEach(key => form.elements[key].removeAttribute("aria-invalid"));
      }
    });
    form.addEventListener("input", event => {
      const key = event.target.name;
      const output = key && form.querySelector(`[data-error="${key}"]`);
      if (output) {
        output.textContent = "";
        event.target.removeAttribute("aria-invalid");
      }
    });
  }

  // Day 4: arithmetic parser (no eval or Function execution).
  const display = document.querySelector("#calc-display");
  if (display) {
    let expression = "";
    const render = () => { display.value = expression || "0"; };
    const calculate = source => {
      const tokens = source.match(/\d+(?:\.\d+)?|[()+\-*/%]/g) || [];
      if (!tokens.length || tokens.join("") !== source.replace(/\s/g, "")) throw new Error("Invalid expression");
      let index = 0;
      const primary = () => {
        const token = tokens[index++];
        if (token === "+" || token === "-") {
          const number = primary();
          return token === "-" ? -number : number;
        }
        if (token === "(") {
          const number = sum();
          if (tokens[index++] !== ")") throw new Error("Missing closing bracket");
          return number;
        }
        if (!token || !/^\d/.test(token)) throw new Error("Expected a number");
        return Number(token);
      };
      const product = () => {
        let value = primary();
        while (["*", "/", "%"].includes(tokens[index])) {
          const operator = tokens[index++];
          const right = primary();
          if ((operator === "/" || operator === "%") && right === 0) throw new Error("Cannot divide by zero");
          value = operator === "*" ? value * right : operator === "/" ? value / right : value % right;
        }
        return value;
      };
      const sum = () => {
        let value = product();
        while (tokens[index] === "+" || tokens[index] === "-") {
          const operator = tokens[index++];
          const right = product();
          value = operator === "+" ? value + right : value - right;
        }
        return value;
      };
      const result = sum();
      if (index !== tokens.length || !Number.isFinite(result)) throw new Error("Invalid expression");
      return Number(result.toFixed(8)).toString();
    };
    const press = value => {
      if (value === "clear") expression = "";
      else if (value === "back") expression = expression === "Error" ? "" : expression.slice(0, -1);
      else if (value === "equals") {
        try { expression = calculate(expression); }
        catch { expression = "Error"; }
      } else {
        if (expression === "Error") expression = "";
        expression += value;
      }
      render();
    };
    document.querySelectorAll("[data-calc]").forEach(button => {
      button.addEventListener("click", () => press(button.dataset.calc));
    });
    document.addEventListener("keydown", event => {
      if (/^[0-9()+\-*/%]$/.test(event.key)) {
        event.preventDefault(); press(event.key);
      } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault(); press("equals");
      } else if (event.key === "Backspace") {
        event.preventDefault(); press("back");
      } else if (event.key === "Escape") press("clear");
    });
  }

  // Day 5: to-do app with localStorage persistence.
  const todoForm = document.querySelector("#todo-form");
  const todoList = document.querySelector("#todo-list");
  if (todoForm && todoList) {
    const storageKey = "front-end-course-todos";
    let tasks = [];
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(stored)) tasks = stored.filter(task =>
        task && (typeof task.id === "string" || typeof task.id === "number") &&
        typeof task.text === "string" && typeof task.done === "boolean"
      );
    } catch { tasks = []; }
    const save = () => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
        const status = document.querySelector("#storage-status");
        if (status) status.textContent = "Saved in this browser.";
      } catch {
        const status = document.querySelector("#storage-status");
        if (status) status.textContent = "Browser storage is unavailable; tasks may not persist.";
      }
    };
    const render = () => {
      todoList.replaceChildren();
      const count = document.querySelector("#task-count");
      if (count) count.textContent = `${tasks.filter(task => !task.done).length} remaining · ${tasks.length} total`;
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
        checkbox.setAttribute("aria-label", `Mark ${task.text} as ${task.done ? "incomplete" : "complete"}`);
        checkbox.addEventListener("change", () => {
          task.done = checkbox.checked; save(); render();
        });
        const label = document.createElement("span");
        label.textContent = task.text;
        const remove = document.createElement("button");
        remove.className = "small-button";
        remove.type = "button";
        remove.textContent = "Delete";
        remove.setAttribute("aria-label", `Delete task: ${task.text}`);
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
      if (!text) { input.focus(); return; }
      tasks.push({id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, done: false});
      input.value = ""; save(); render(); input.focus();
    });
    const clearCompleted = document.querySelector("#clear-completed");
    if (clearCompleted) clearCompleted.addEventListener("click", () => {
      tasks = tasks.filter(task => !task.done); save(); render();
    });
    render();
  }
});
